import { CountService } from './../../services/count.service';
import { Component, OnInit } from '@angular/core';
import { Product, Shop } from '../../api/models';
import { ProductService } from '../../services/product.service';
import { ShopService } from '../../services/shop.service';
import { CategoryService } from '../../services/category.service';
import { CustomService } from '../../services/custom.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public approved = -1;
  public status = -1;
  public shop_id = 0;
  public type_product = 'all';
  public category_id = 0;
  public offset = 0;
  public limit = 10;
  public values = [];
  public selectAction = '0';
  public products: Product[] = [];
  public productDisplay: Product[] = [];

  public progressbars = [];
  public is_progressbars = false;
  public inserted = [];
  public updated = [];
  public error = [];
  public list_progressbar = [];
  public counter = 0;
  public number_inserted = 0;
  public number_updated = 0;
  public number_error = 0;
  public progressInterval;
  public code: string;
  public intervalProgress;
  public percent = '0%';

  productId: string[] = [];
  public statusProduct: Array<any>;
  public statusApproval: Array<any>;
  public typeCategories: Array<any>;
  public categories: Array<any>;
  public shops: Shop[];
  public file: any;
  public image: any;
  public selectedShop: Shop;
  public search = false;

  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;

  selectedAll: Boolean = false;
  keywordProduct: string;
  public statusSort: Boolean = true;
  public count: any;
  constructor(
    private productService: ProductService,
    private shopService: ShopService,
    private categoryService: CategoryService,
    public customService: CustomService,
    private router: Router,
    private countService: CountService
  ) {
  }

  onScrollDown(ev: any) {
    this.offset = this.offset + 10;
    this.getProducts();
  }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'manager') {
      this.shop_id = +this.customService.userCurrent.shop.id;
    }
    this.statusProduct = this.customService.statusProduct;
    this.typeCategories = this.customService.searchTypeProduct;
    this.statusApproval = this.customService.statusApproval;

    this.categoryService.getCategoriesByShop(this.shop_id.toString(), 1, 0, 9999999).subscribe( data => {
      if (data.hasOwnProperty('error')) {
      } else {
        this.categories = data;
      }
    });

    if (this.customService.userCurrent.type === 'admin') {
      this.shopService.getShopsApproved(9999999, 0).subscribe( data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.shops = data;
        }
      });
      this.getCount('');
    } else {
      this.getCount(this.shop_id);
    }
    this.getProducts();
  }

  getCount(shopID) {
    this.countService.getCount(shopID, 'product').subscribe(data => {
      this.count = data.count;
    });
  }

  getProducts() {
    if (this.products.length <= 0) {
      swal({
        title: 'Vui lòng đợi...'
      });
      swal.showLoading();
    }
    this.productService.getProducts2(
      this.shop_id, this.category_id, this.approved, this.status, this.type_product, this.keywordProduct, 'false', this.offset, this.limit
      ).subscribe(data => {
        this.search = false;
        swal.close();
      if (data.hasOwnProperty('error')) {
      } else {
        this.products = this.products.concat(data);
        this.productDisplay = this.products;
        this.productDisplay.forEach(p => {
          if (typeof this.values[p.id] === 'undefined') {
            this.values[p.id] = false;
          }
          if (this.values[p.id] === true) {
            this.values[p.id] = true;
          } else {
            this.values[p.id] = false;
          }
        });
      }
    });
  }

  filterFormProduct() {
    this.products = [];
    this.productDisplay = [];
    this.offset = 0;
    this.limit = 10;
    this.values = [];
    this.selectedAll = false;
    this.getProducts();
    this.getCount(this.shop_id);
  }

  editApproval() {
    this.productId = [];
    this.values.forEach((value, index, data) => {
      if (value === true) {
        const checkApproval = this.products.filter(
          row => {
            return row.id === index.toString();
          }
        );
        if (typeof (checkApproval) !== 'undefined') {
          if (checkApproval[0].approved === '0') {
            this.productId.push(index.toString());
          }
        }
      }
    });
    swal({
      title: 'Bạn muốn duyệt sản phẩm này',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý !'
    }).then((result) => {
      if (result.value) {
        swal({
          title: 'Vui lòng đợi...'
        });
        swal.showLoading();
        this.productService.editApproval(
          this.productId,
          'product'
        ).subscribe(
          data => {
            if (data.status) {
              swal({
                type: 'success',
                title: 'Duyệt sản phẩm thành công',
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                swal.close();
                this.offset = 0;
                this.limit = 10;
                this.products = [];
                this.productDisplay = [];
                this.getProducts();
                this.selectedAll = false;
                this.productId = [];
                this.values = [];
              });
            }
          }
        );
      }
    });
  }

  detectFiles(event, type) {
    const files = event.target.files;
    if (files) {
      switch (type) {
        case 'excel':
          this.file = files[0];
          break;
        case 'image':
          this.image = files[0];
          break;
        default:
          break;
      }
    }
  }

  selectShop(shop: Shop) {
      this.selectedShop = shop;
      this.shop_id = +shop.id;
  }

  excelProduct() {
    swal({
      title: 'Vui lòng đợi...'
    });
    swal.showLoading();
    this.productService.getProgressbar(this.shop_id, 'product').subscribe(data => {
      if (data.hasOwnProperty('status')) {
        this.productService.excel_products(this.shop_id, this.file, 'product').subscribe(
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

  file_excel_product_default() {
    this.productService.excel_product_default(this.shop_id.toString(), 'product').subscribe(data => {
      if (data.hasOwnProperty('url')) {
        window.location.href = data.url;
      }
    });
  }

  deleteProductChecked() {
    this.productId = [];
    this.values.forEach((value, index, data) => {
      if (value === true) {
        this.productId.push(index.toString());
      }
    });
    swal({
      title: 'Bạn muốn xóa sản phẩm này',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý !'
    }).then((result) => {
      if (result.value) {
        this.productService.deleteProduct({
          id: this.productId,
          image: null
        }).subscribe(
          data => {
            if (data.status) {
              swal(
                'Deleted!',
                'Sản phẩm đã được xóa',
                'success'
              );
              this.offset = 0;
              this.limit = 10;
              this.products = [];
              this.productDisplay = [];
              this.getProducts();
              this.selectedAll = false;
              this.productId = [];
              this.values.forEach((value, index, data) => {
                if (value === true) {
                  delete this.values[index];
                }
              });
            }
          }
        );
      }
    });
  }

  selectedAction(value: string) {
    this.selectAction = value;
  }

  action() {
    switch (this.selectAction) {
      case '1':
        this.turnOn();
        break;
      case '2':
        this.turnOff();
        break;
      case '3':
        this.deleteProductChecked();
        break;
      case '4':
        this.editApproval();
        break;
      default:
        break;
    }
    this.selectAction = '0';
  }

  turnOn() {
    this.productId = [];
    this.values.forEach((value, index, data) => {
      if (value === true) {
        this.productId.push(index.toString());
      }
    });
    swal({
      title: 'Bạn muốn mở sản phẩm này',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý !'
    }).then((result) => {
      if (result.value) {
        swal({
          title: 'Vui lòng đợi...'
        });
        swal.showLoading();
        this.productService.turnOn(this.productId, 'product').subscribe(
          data => {
            if (data.status) {
              swal({
                type: 'success',
                title: 'Mở sản phẩm!',
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                swal.close();
                this.offset = 0;
                this.limit = 10;
                this.products = [];
                this.productDisplay = [];
                this.getProducts();
                this.selectedAll = false;
                this.productId = [];
                this.values = [];
              });
            }
          }
        );
      }
    });

  }

  turnOff() {
    this.productId = [];
    this.values.forEach((value, index, data) => {
      if (value === true) {
        this.productId.push(index.toString());
      }
    });
    swal({
      title: 'Bạn muốn đóng sản phẩm này',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Đồng ý !'
    }).then((result) => {
      if (result.value) {
        swal({
          title: 'Vui lòng đợi...'
        });
        swal.showLoading();
        this.productService.turnOff(
          this.productId,
          'product'
        ).subscribe(
          data => {
            if (data.status) {
              swal({
                type: 'success',
                title: 'Đóng sản phẩm!',
                showConfirmButton: false,
                timer: 2000
              }).then(() => {
                swal.close();
                this.offset = 0;
                this.limit = 10;
                this.products = [];
                this.productDisplay = [];
                this.getProducts();
                this.selectedAll = false;
                this.productId = [];
                this.values = [];
              });
            }
          }
        );
      }
    });

  }

  refresh() {
    this.percent = '0%';
    this.inserted = this.updated = this.error = this.list_progressbar = [];
    this.counter = this.number_error = this.number_inserted = this.number_updated = 0;
  }

  selectAllProduct() {
    if (this.selectedAll) {
      this.values.forEach( (value, index, data) => {
        this.values[index] = true;
      });
    } else {
      this.values.forEach((value, index, data) => {
        this.values[index] = false;
      });
    }
  }

  searchProductByKeyWord() {
    this.offset = 0;
    this.products = [];
    this.productDisplay = [];
    this.selectedAll = false;
    this.productId = [];
    this.values = [];
    this.getProducts();
    
    // this.productService.searchProduct(null, 'product', this.keywordProduct).subscribe( data => {
    //   this.products = data.products;
    //   this.productDisplay = this.products;
    // })
    // const params: Array<string> = ['sku', 'title', 'price'];
    // this.productDisplay = this.customService.searchTableByKey(
    //   this.products,
    //   this.keywordProduct,
    //   params
    // );
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
    this.productDisplay.sort(this.customService.compareValuesSort(param, condition));
  }

  onValueSelectionChange(e, valueId: string): void {
    if (e.checked) {
      this.productId.push(valueId);
    } else {
      const index = this.productId.indexOf(valueId);

      if (index > -1) {
        this.productId.splice(index, 1);
      }
    }
  }

  formatPrice(price) {
    return this.customService.formatCurrency(price + '' , 'VND');
  }
}
