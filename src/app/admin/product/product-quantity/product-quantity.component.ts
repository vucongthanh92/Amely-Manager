import { CustomService } from 'src/app/services/custom.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ShopService } from '../../../services/shop.service';
// tslint:disable-next-line:max-line-length
import { RequestGetShops, RequestProductStore, RequestGetProductStores, Shop, Store, Product, RequestGetProducts } from '../../../api/models';
import { ProductService } from 'src/app/services/product.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @ViewChild('numberPattern') numberPattern;
  public shops = [];
  public shop: any;
  public stores: Store[] = [];
  public products: Product[] = [];
  public items = [];
  public test = [];
  public quantity: number;
  public onValueModal: number;
  public titleProduct: string;
  public titleStore: string;
  public sku: string;
  public productID: string;
  public storeID: string;
  public count = 0;
  public userCurrent: any;

  public approved = 1;
  public status = -1;
  public shop_id = 0;
  public type_product = 'all';
  public category_id = 0;
  public offset = 0;
  public limit = 20;

  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;

  public inserted = [];
  public updated = [];
  public error = [];
  public list_progressbar = [];
  public counter = 0;
  public number_inserted = 0;
  public number_updated = 0;
  public number_error = 0;
  public percent = '0%';
  public file: any;

  constructor(
    private shopService: ShopService,
    private productService: ProductService,
    public customService: CustomService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopService.getShopsApproved(9999, 0).subscribe(
        data => {
          this.shops = data;
        });
    } else {
      this.shop_id = Number(this.customService.userCurrent.shop.id);
      
      this.getData();
    }

  }

  onScrollDown() {
    this.offset = this.offset + this.limit;
    this.getProducts();
  }

  getData() {
    this.shopService.getShop(this.shop_id.toString()).subscribe(
      data => {
        if (data.hasOwnProperty('error')) {
          this.stores = [];
          this.products = [];
        } else {
          this.stores = data.stores;
          this.stores.forEach(s => {
            var store_id = s.id;
            this.productService.getProducts2(
              this.shop_id, this.category_id, this.approved, this.status, this.type_product, '', 'false', this.offset, this.limit
            ).subscribe(data => {
              if (data.hasOwnProperty('error')) {
                this.products = [];
              } else {
                this.products = this.products.concat(data);
                const valueToPush = new Array();
                this.products.forEach(p => {
                  valueToPush[p.id] = 0;
                });
                this.items[s.id] = valueToPush;
                this.getProductStore();
              }
            });
          });
        }
      }
    );

  }

  getStores() {
    this.shopService.getShop(this.shop_id.toString()).subscribe(
      data => {
        if (data.hasOwnProperty('error')) {
          this.stores = [];
        } else {
          this.stores = data.stores;
        }
      }
    );
  }

  getProducts() {
    this.productService.getProducts2(
      this.shop_id, this.category_id, this.approved, this.status, this.type_product, '', 'false', this.offset, this.limit
    ).subscribe(data => {
      if (data.hasOwnProperty('error')) {
      } else {
        this.products = this.products.concat(data);
      }
    });
  }

  getProductStore() {
    this.productService.getProductStore({
      shop_id: this.shop_id.toString(),
      offset: 0,
      limit: 999999999
    }).subscribe(data => {
      if (data.hasOwnProperty('error')) {
      } else {
        for (var store_id in data.items) {
          for (var product_id in data.items[store_id]) {
            this.items[store_id][product_id] = data.items[store_id][product_id];
          }
        }
      }
    });
  }


  onShopChange(shop) {
    this.shop_id = shop.id;
    this.products = [];
    this.offset = 0;
    this.limit = 20;
    this.getData();
  }

  selectQuantity(store, product) {
    this.titleProduct = product.title;
    this.titleStore = store.title;
    this.sku = product.sku;
    this.productID = product.id;
    this.storeID = store.id;
    if (typeof (this.items) !== 'undefined') {
      if (typeof (this.items[store.id]) !== 'undefined') {
        if (typeof (this.items[store.id][product.id]) !== 'undefined') {
          return this.onValueModal = this.items[store.id][product.id];
        }
        return this.onValueModal = 0;
      }
      return this.onValueModal = 0;
    }
    return this.onValueModal = 0;
  }

  updateQuantity() {
    if (this.onValueModal < 0) {
      swal({
        type: 'warning',
        title: 'Số lượng phải lớn hơn 0 !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (!this.onValueModal) {
      swal({
        type: 'warning',
        title: 'Số lượng không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (this.numberPattern.errors) {
      swal({
        type: 'warning',
        title: 'Số lượng phải là số nguyên !',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      const params = new RequestProductStore;
      params.product_id = this.productID;
      params.store_id = this.storeID;
      params.quantity = this.onValueModal;
      this.productService.addproductStore(params).subscribe(data => {
        if (data.status) {
          this.items[this.storeID][this.productID] = this.onValueModal;
          swal({
            type: 'success',
            title: 'Cập nhật số lượng thành công !',
            showConfirmButton: false,
            timer: 2000
          });
        } else {
          swal({
            type: 'error',
            title: 'Cập nhật số lượng thất bại !',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    }
  }

  getQuantityStoreProduct(store_id, product_id) {
        
    if (typeof (this.items) !== 'undefined') {
      if (typeof (this.items[store_id]) !== 'undefined') {
        if (typeof (this.items[store_id][product_id]) !== 'undefined') {
          return this.items[store_id][product_id];
        }
        return 0;
      }
      // const valueToPush = new Array();
      // valueToPush[product_id] = 0;
      // this.items[store_id] = valueToPush;
      // return 0;
    }
  }

  file_quantity_default() {
    this.productService.excel_product_default(this.shop_id.toString(), 'quantity').subscribe(data => {
      if (data.hasOwnProperty('url')) {
        window.location.href = data.url;
      }
    });
  }

  refresh() {
    this.percent = '0%';
    this.inserted = this.updated = this.error = this.list_progressbar = [];
    this.counter = this.number_error = this.number_inserted = this.number_updated = 0;
  }
  
  detectFiles(event, type) {
    const files = event.target.files;
    if (files) {
      switch (type) {
        case 'excel':
          this.file = files[0];
          break;
        default:
          break;
      }
    }
  }

  excelProduct() {
    swal({
      title: 'Vui lòng đợi...'
    });
    swal.showLoading();
    this.productService.getProgressbar(this.shop_id, 'quantity').subscribe(data => {
      if (data.hasOwnProperty('status')) {
        this.productService.excel_products(this.shop_id, this.file, 'quantity').subscribe(
          result => {
            this.refresh();
            swal.close();
            this.router.navigate(['/admin/progress/' + result.code]);
          });
      } else {
        swal({
          title: '',
          text: 'Bạn đang có 1 tiến trình đang chạy !',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Chuyển đến tiến trình.',
          cancelButtonText: 'Thoát',
        }).then((result) => {
          if (result.value) {
            this.router.navigate(['/admin/progress/' + data[0].code]);
          }
        });
      }
    });
  }
}
