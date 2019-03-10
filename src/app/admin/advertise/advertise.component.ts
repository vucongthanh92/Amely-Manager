import { CustomService } from './../../services/custom.service';
import { Advertise } from './../../api/models/advertise';
import { ApprovalService } from './../../services/approval.service';
import { AdvertiseService } from './../../services/advertise.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
@Component({
  selector: 'app-advertise',
  templateUrl: './advertise.component.html',
  styleUrls: ['./advertise.component.css']
})
export class AdvertiseComponent implements OnInit {
  public advertises = [];
  public selectedIdAdvertise: string[];
  public selectedType = -1;
  public selectApproved = 0;
  public offset = 0;
  public limit = 10;
  // tslint:disable-next-line:no-inferrable-types
  public approved: string = '-1';
  public isSelected: Boolean = false;

  public shopId = '0';
  public status = '-1';

  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;
  public advertisesDisplay: Advertise[] = [];
  public selectedAll: Boolean = false;
  public userCurrent: any;
  public userCurrentShop: any;
  public keywordAdvertise: string;
  public statusSort: Boolean = true;
  constructor(
    private advertiseService: AdvertiseService,
    private approval: ApprovalService,
    public customService: CustomService
  ) { }

  onScrollDown(ev: any) {
    this.offset = this.offset + this.limit;
    this.getAdvertiseByShop();
  }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopId = '';
    } else {
      this.shopId = this.customService.userCurrent.shop.id;
    }
    this.getAdvertiseByShop();

    this.selectedIdAdvertise = [];
  }

  selectFillterType(value: number) {
    this.selectedType = value;
  }

  selectApprove(value: number) {
    this.selectApproved = value;
  }

  selectFillterApproved(value: string) {
    this.approved = value;
  }

  filterSubmit() {
    this.advertises = [];
    this.offset = 0;
    this.limit = 10;
    this.getAdvertiseByShop();
  }

  getAdvertiseByShop() {
    if (this.advertises.length <= 0) {
      swal({
        title: 'Vui lòng đợi...'
      });
      swal.showLoading();
    }
    // tslint:disable-next-line:max-line-length
    this.advertiseService.getAdvertises(this.selectedType, this.approved, this.limit, this.offset, this.shopId, this.status).subscribe(data => {
      if (data.hasOwnProperty('error')) {
        if (this.offset === 0) {
          swal.close();
          this.advertises = [];
          this.advertisesDisplay = [];
          this.offset = 0;
          this.limit = 10;
        }
        swal.close();
      } else {
        swal.close();
        this.advertises = this.advertises.concat(data);
        this.advertisesDisplay = this.advertises;
      }
    });
  }

  onValueSelectionChange(e, valueId: string): void {
    if (e.checked) {
      this.isSelected = true;
      this.selectedIdAdvertise.push(valueId);
    } else {
      this.isSelected = false;
      const index = this.selectedIdAdvertise.indexOf(valueId);

      if (index > -1) {
        this.selectedIdAdvertise.splice(index, 1);
      }
    }
  }

  editApproval() {
    swal({
      title: 'Vui lòng đợi...'
    });
    swal.showLoading();
    this.approval.editApproval(this.selectedIdAdvertise, 'advertise').subscribe(data => {
      swal({
        type: 'success',
        title: 'Duyệt quảng cáo thành công',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
          swal.close();
          this.refresh();
        });
      });
  }

  selectAllAdvertise() {
    if (this.selectedAll) {
      this.isSelected = true;
      this.selectedIdAdvertise = [];
      this.advertisesDisplay.map(
        data => {
          this.selectedIdAdvertise.push(data.id);
        }
      );
    } else {
      this.isSelected = false;
      this.selectedIdAdvertise = [];
    }
  }

  searchAdvertiseByKeyWord() {
    const params: Array<string> = ['id', 'time_created' , 'title'];
    this.advertisesDisplay = this.customService.searchData(this.advertises, this.keywordAdvertise, params);
  }

  sortTableByBranch(param: string) {
    let condition: string;
    if (this.statusSort === true) {
      condition = 'asc';
      this.statusSort = false;
    } else {
      condition = 'desc';
      this.statusSort = true;
    }
    this.advertisesDisplay.sort(this.customService.compareValuesSort(param, condition));
  }

  sortTableByNumber(param: string) {
    let condition: string;
    if (this.statusSort === true) {
      condition = 'asc';
      this.statusSort = false;
    } else {
      condition = 'desc';
      this.statusSort = true;
    }
    this.advertisesDisplay.sort(this.customService.compareValuesNumberSort(param, condition));
  }

  refresh() {
    this.offset = 0;
    this.limit = 10;
    this.advertises = [];
    this.advertisesDisplay = [];
    this.getAdvertiseByShop();
    this.selectedAll = false;
    this.selectedIdAdvertise = [];
  }

  formatAmount(amount) {
    return this.customService.formatCurrency(amount + '' , 'VND');
  }

}
