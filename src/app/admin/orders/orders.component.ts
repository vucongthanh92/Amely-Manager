import { Component, OnInit } from '@angular/core';
import { SoService } from '../../services/so.service';
import { Shop } from '../../api/models';
import { ShopService } from '../../services/shop.service';
import swal from 'sweetalert2';
import { CustomService } from '../../services/custom.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  public orders = [];
  public ordersDisplay = [];
  public userSelect: string;
  public shops: Shop[];
  public shopID = '0';
  public is_order = false;
  // tslint:disable-next-line:no-inferrable-types
  public status: string = '-1';
  public userCurrent: any;
  public keywordOrders: string;
  public statusSort: Boolean = true;
  public offset = 0;
  public limit = 10;
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;
  constructor(private soService: SoService, private shopService: ShopService, public customService: CustomService) {}

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopService.getShops(1, -1, false, 9999, 0).subscribe(data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.shops = data;
          this.shopID = '';
          this.getSOs();
        }
      });
    } else {
      this.shopID = this.customService.userCurrent.shop.id;
      this.getSOs();
    }
  }
  onScrollDown(ev: any) {
    this.offset = this.offset + this.limit;
    this.getSOs();
  }

  onSelectStatus(value: string) {
    this.status = value;
  }

  onShopChange(value: string) {
    this.shopID = value;
    this.filterSubmit();
  }

  filterSubmit() {
    this.offset = 0;
    this.limit = 10;
    this.orders = [];
    this.ordersDisplay = [];
    this.getSOs();
  }

  getSOs() {
    this.soService.getSOs(this.shopID, '', this.status, this.offset, this.limit).subscribe(data => {
      if (data.hasOwnProperty('error')) {
        if (this.offset > 0) {
          return;
        } else {
          swal({
            type: 'warning',
            text: 'Không có đơn hàng !',
            showConfirmButton: false,
            confirmButtonColor: '#049F0C',
            confirmButtonText: 'Yes',
          });
          this.is_order = false;
        }
      } else {
        this.orders = this.orders.concat(data);
        this.ordersDisplay = this.orders;
        this.is_order = true;
      }
    });
  }


  formatAmount(amount) {
    return this.customService.formatCurrency(amount + '' , 'VND');
  }

  searchOrderByKeyWord() {
    const params: Array<string> = ['total', 'display_order', 'quantity'];
    this.ordersDisplay = this.customService.searchData(this.orders, this.keywordOrders, params);
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
    this.ordersDisplay.sort(this.customService.compareValuesSort(param, condition));
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
    this.ordersDisplay.sort(this.customService.compareValuesNumberSort(param, condition));
  }
}
