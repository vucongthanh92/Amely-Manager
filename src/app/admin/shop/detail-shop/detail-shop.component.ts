import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shop } from '../../../api/models/shop';
import { ShopService } from '../../../services/shop.service';
import { StoreService } from '../../../services/store.service';
import swal from 'sweetalert2';
declare var $: any;
declare var tinymce: any;
@Component({
  selector: 'app-detail-shop',
  templateUrl: './detail-shop.component.html',
  styleUrls: ['./detail-shop.component.css']
})
export class DetailShopComponent implements OnInit {
  shop = new Shop;
  stores: any;
  public shopID: string;
  // tslint:disable-next-line:max-line-length
  constructor(private routeActive: ActivatedRoute, private shopService: ShopService, private storeService: StoreService, private router: Router) {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    $('.select2').select2();
    $('#tags').tagsinput();
    tinymce.remove();
    tinymce.init({
      selector: 'textarea',
      theme: 'modern',
      height: 300,
    });
  }
  ngOnInit() {
    this.routeActive.params.subscribe(params => {
      this.shopID = params.id;
    });
    this.getShopAndStore();
  }

  getShopAndStore() {
    this.shopService.getShop(this.shopID).subscribe(
      data => {
        this.shop = data;
        this.stores = data.stores;
      }
    );
  }

  deleteShop(idShop: string) {
    swal({
      title: 'Bạn muốn xóa cửa hàng?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.value) {
        this.shopService.deleteShop(idShop).subscribe(data => {
          if (data.status) {
            swal({
              type: 'success',
              title: 'Xóa cửa hàng thành công',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              this.router.navigate(['/shop']);
            });
          } else {
            swal({
              type: 'error',
              title: 'Xóa cửa hàng thất bại',
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
      }
    });
  }

  deleteStore(id: string) {
    swal({
      title: 'Bạn Muốn Xóa Chi Nhánh?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.value) {
        this.storeService.deleteStore(id).subscribe(data => {
          if (data.status) {
            swal({
              type: 'success',
              title: 'Xóa chi nhánh thành công',
              showConfirmButton: false,
              timer: 2000
            }).then(() => {
              this.getShopAndStore();
            });
          } else {
            swal({
              type: 'error',
              title: 'Xóa chi nhánh thất bại',
              showConfirmButton: false,
              timer: 2000
            });
          }
        });
      }
    });
  }



}
