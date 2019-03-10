import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShopService } from '../../services/shop.service';
import swal from 'sweetalert2';
import { ProductService } from '../../services/product.service';
import { Shop } from '../../api/models';
import { CustomService } from '../../services/custom.service';
declare var $: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  public shopDisplay: Shop[] = [];
  public selectedIdShop: string[];
  public shops = [];
  public selectApproved = 0;
  // tslint:disable-next-line:no-inferrable-types
  public status: string = '-1';
  // tslint:disable-next-line:no-inferrable-types
  public approved: string = '-1';
  // public requestGetShops: RequestGetShops;
  public is_shops = false;
  public selectedAll: Boolean = false;
  public keywordShop: string;
  public offset = 0;
  public limit = 15;
  public statusSort: Boolean = true;
  constructor(
    private productService: ProductService,
    public router: Router,
    private shopService: ShopService,
    private customService: CustomService
  ) {
    this.selectedIdShop = [];
  }

  ngOnInit() {
    this.getShops();
  }

  onScrollDown(ev: any) {
    this.offset = this.offset + this.limit;
    this.getShops();
  }


  selectApprove(value: number) {
    this.selectApproved = value;
  }

  onValueSelectionChange(e, valueId: string): void {
    if (e.checked) {
      this.selectedIdShop.push(valueId);
    } else {
      const index = this.selectedIdShop.indexOf(valueId);

      if (index > -1) {
        this.selectedIdShop.splice(index, 1);
      }
    }
  }

  editApproval() {
    this.productService.editApproval(this.selectedIdShop, 'shop').subscribe(data => {
      swal({
        type: 'success',
        title: 'Duyệt cửa hàng thành công',
        showConfirmButton: false,
        timer: 2000
      }).then(() => {
        this.refresh();
      });
    });
  }

  onSelectStatus(value: string) {
    this.status = value;
  }

  onSelectApproved(value: string) {
    this.approved = value;
  }

  filterSubmit() {
    this.shops = [];
    this.shopDisplay = [];
    this.offset = 0;
    this.limit = 10;
    this.getShops();
  }

  getShops() {
    this.shopService.getShops(this.approved, this.status, false, this.limit, this.offset).subscribe(data => {
        if (data.hasOwnProperty('error')) {
          if (this.offset === 0) {
            swal.close();
            this.shops = [];
            this.shopDisplay = [];
            this.offset = 0;
            this.limit = 10;
          }
        } else {
          this.shops = this.shops.concat(data);
          this.shopDisplay = this.shops;
          this.is_shops = true;
        }
    });
  }

  selectAllShop() {
    if (this.selectedAll) {
      this.selectedIdShop = [];
      this.shopDisplay.map(
        data => {
          this.selectedIdShop.push(data.id.toString());
        }
      );
    } else {
      this.selectedIdShop = [];
    }
  }

  searchShopByKeyWord() {
    const params: Array<string> = ['title', 'owner_name', 'owner_phone'];
    this.shopDisplay = this.customService.searchData(this.shops, this.keywordShop, params);
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
    this.shopDisplay.sort(this.customService.compareValuesSort(param, condition));
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
    this.shopDisplay.sort(this.customService.compareValuesNumberSort(param, condition));
  }

  refresh() {
    this.offset = 0;
    this.limit = 10;
    this.shops = [];
    this.shopDisplay = [];
    this.getShops();
    this.selectedAll = false;
    this.selectedIdShop = [];
  }

}
