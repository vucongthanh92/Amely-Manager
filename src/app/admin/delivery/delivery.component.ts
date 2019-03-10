import { CustomService } from 'src/app/services/custom.service';
import { Component, OnInit } from '@angular/core';
import { DoService } from '../../services/do.service';
import { ShopService } from '../../services/shop.service';
import { Shop } from '../../api/models';
import swal from 'sweetalert2';
declare var $: any;
declare var tinymce: any;
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  public shops: Shop[];
  public shopID: any;
  public deliveries = [];
  public deliveriesDisplay = [];
  public status = '-1';
  public is_delivery = false;
  public userCurrent: any;
  public keywordDeliveries: string;
  public statusSort: Boolean = true;
  public offset = 0;
  public limit = 10;
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;
  constructor(private doService: DoService, private shopService: ShopService, public customService: CustomService) { }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopService.getShops(1, -1, false, 9999, 0).subscribe(data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.shops = data;
          this.shopID = '';
          this.getDOs();
        }
      });
    } else {
      this.shopID = this.customService.userCurrent.shop.id;
      this.getDOs();
    }
  }

  onScrollDown(ev: any) {
    this.offset = this.offset + this.limit;
    this.getDOs();
  }

  onShopChange(value: string) {
    this.shopID = value;
    this.filterSubmit();
  }

  onSelectStatus(value: string) {
    this.status = value;
  }

  filterSubmit() {
    this.offset = 0;
    this.limit = 10;
    this.deliveries = [];
    this.deliveriesDisplay = [];
    this.getDOs();
  }

  getDOs() {
    this.doService.getDOs(this.shopID, '', this.status, this.offset, this.limit).subscribe(data => {
      if (data.hasOwnProperty('status')) {
        if (this.offset > 0) {
          return;
        } else {
        swal({
          type: 'warning',
          text: 'Không có dữ liệu giao hàng !',
          showConfirmButton: false,
          confirmButtonColor: '#049F0C',
          confirmButtonText: 'Yes',
        });
        this.is_delivery = false;
        }
      } else {
        this.deliveries = this.deliveries.concat(data);
        this.deliveriesDisplay = this.deliveries;
        this.is_delivery = true;
      }
    });
  }

  searchDeliveryByKeyWord() {
    const params: Array<string> = ['so_id', 'display_order', 'shipping_fullname'];
    this.deliveriesDisplay = this.customService.searchData(this.deliveries, this.keywordDeliveries, params);
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
    this.deliveriesDisplay.sort(this.customService.compareValuesSort(param, condition));
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
    this.deliveriesDisplay.sort(this.customService.compareValuesNumberSort(param, condition));
  }
}
