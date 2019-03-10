import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Category } from 'src/app/api/models/category';
import { Product } from 'src/app/api/models/product';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/api/models/shop';

import { CategoryService } from 'src/app/services/category.service';
import { CustomService } from 'src/app/services/custom.service';
import { ProductService } from 'src/app/services/product.service';

import { SlugifyPipe } from 'src/app/slugify.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})

export class UpdateProductComponent implements OnInit {
  public marketCategories: Array<any>;
  public shopCategories: Array<any>;
  public voucherCategories: Category[];
  public ticketCategories: Category[];
  category: Array<string>;

  public shops: Shop[];
  public shopId = '';
  public product: Product;
  public tags: Array<any>;
  public itemsMarket: Array<any>;
  public itemsShop: Array<any>;

  public statusProduct: Array<any>;
  public expiryTypeProduct: Array<any>;
  public productGroup: Array<any>;

  public beginDay = '';
  public endDay = '';
  public uploadImageForm: FormGroup;
  public fileImages: FileImage[];
  public fileImage: FileImage;
  public isLoading: Boolean = false;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private customService: CustomService,
    private shopService: ShopService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private slugifyPipe: SlugifyPipe,
    private formBuilder: FormBuilder
  ) {
    this.product = new Product();
    this.category = [];
    this.tags = [];
    this.fileImages = [];

    this.statusProduct = this.customService.statusSelect;
    this.expiryTypeProduct = this.customService.expiryTypeProduct;
    this.productService.getAllProductGroup().subscribe(
      data => {
        this.productGroup = data;
      }
    );
  }

  ngOnInit() {
    this.uploadImageForm = this.formBuilder.group({
      documentFile: new FormControl(File),
      items: this.formBuilder.array([this.createUploadDocuments()])
    });

    this.activeRoute.params.subscribe(params => {
      this.productService.getProduct(params.id).subscribe(
        data => {
          if (!data.status) {
            swal({
              type: 'error',
              title: 'Sản phẩm bị lỗi dữ liệu',
              showConfirmButton: false,
              timer: 1500
            });
            return false;
          } else {
            this.product = data;
            this.product.images.filter(
              (image, index) => {
                this.fileImage = new FileImage();
                this.items.insert(0, this.createUploadDocuments());
                this.fileImage.filename = this.product.images_name[index];
                this.fileImage.source = '';
                this.fileImage.url = image;
                this.fileImage.upload = 0;
                this.fileImages.push(this.fileImage);
              }
            );

            if (this.product.tag !== '') {
              this.product.tag.split(',').map(
                result => {
                  this.tags.push({
                    display: result,
                    value: result
                  });
                }
              );
            }
            if (this.product.begin_day && this.product.end_day) {
              this.beginDay = moment.unix(Number(this.product.begin_day)).format('DD-MM-YYYY');
              this.endDay = moment.unix(Number(this.product.end_day)).format('DD-MM-YYYY');
            }
          }
        }
      );
    });

    this.categoryService.getCategories('0', '0', 0, 99999, '').subscribe(
      data => {
        if (data.length) {
          this.marketCategories = this.productService.convertStringToArray(data);
          let categories: Array<string> = [];
          if ((this.product.market_category) && (this.product.market_category !== '')) {
            categories = this.product.market_category.split(',');
            this.itemsMarket = [];
            this.marketCategories.filter(
              result => {
                const temp = categories.find(response => response === result.id);
                if (temp) {
                  this.itemsMarket.push(result);
                }
              }
            );
          }
        }
      }
    );

    this.categoryService.getCategories('0', '1', 0, 99999, '').subscribe(
      data => {
        if (data.length) {
          this.voucherCategories = data;
        }
      }
    );

    this.categoryService.getCategories('0', '2', 0, 99999, '').subscribe(
      data => {
        if (data.length) {
          this.ticketCategories = data;
        }
      }
    );

    this.shopService.getShops(1, -1, false , 9999, 0).subscribe(
      data => {
        if (data.length) {
          this.shops = data;
          this.getShopCategories(this.product.owner_id);
        }
      }
    );
  }

  createUploadDocuments(): FormGroup {
    return this.formBuilder.group({
      documentFile: File
    });
  }

  get items(): FormArray {
    return this.uploadImageForm.get('items') as FormArray;
  }

  addItem(): void {
    if (this.fileImages.length > 0) {
      this.items.insert(0, this.createUploadDocuments());
    }
  }

  removeItem(index: number) {
    const productID: Array<string> = [];
    productID.push(this.product.id);
    index --;

    swal({
      title: 'Bạn muốn xóa hình ảnh này của sản phẩm ?',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.value) {
        if (this.fileImages[index].upload === 0) {
          this.productService.deleteProduct({
            id: productID,
            image: this.fileImages[index].filename
          }).subscribe(
            response => {
            }
          );
        }
        this.fileImages.splice(index, 1);
        this.items.removeAt(index);
      }
    });
  }

  fileSelectionEvent(fileInput: any, oldIndex: number) {
    let resultImageValue: any = null;
    resultImageValue = this.productService.getImageByUploadFile(fileInput, oldIndex);
    if (resultImageValue.error === true) {
      swal({
        type: 'error',
        title: resultImageValue.alert,
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      if (this.fileImages.length > 7) {
        swal({
          type: 'error',
          title: 'Sản phẩm chỉ được upload tối đa 8 ảnh',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        this.fileImage = new FileImage();
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.fileImage.url = e.target.result;
        };
        reader.readAsDataURL(fileInput.target.files[0]);
        this.fileImage.filename = resultImageValue.fileName;
        this.fileImage.source = resultImageValue.fileSource;
        this.fileImage.url = '';
        this.fileImage.upload = 1;
        this.fileImages.push(this.fileImage);
        this.addItem();
      }
    }
  }

  changeShopToCategory() {
    this.getShopCategories(this.product.owner_id);
  }

  getShopCategories(shopId: string) {
    this.itemsShop = [];
    this.shopCategories = [];
    this.categoryService.getCategories(shopId, '3', 0, 9999, '').subscribe(
      data => {
        if (data.length) {
          this.shopCategories = this.productService.convertStringToArray(data);
          let categories: Array<string> = [];
          if ((this.product.shop_category) && (this.product.shop_category !== '')) {
            categories = this.product.shop_category.split(',');
            this.itemsShop = [];
            this.shopCategories.filter(
              result => {
                const temp = categories.find(response => response === result.id);
                if (temp) {
                  this.itemsShop.push(result);
                }
              }
            );
          }
        }
      }
    );
  }

  changeSpecial(value: string) {
    this.product.is_special = value;
  }

  convertToFriendlyURL(params: string) {
    this.product.friendly_url = this.slugifyPipe.transform(params);
  }

  editProduct() {
    this.isLoading = true;
    if (this.productService.checkParamsProduct(this.product, this.itemsShop, this.itemsMarket, this.beginDay, this.endDay) === false) {
      this.isLoading = false;
      return false;
    }

    if (!this.product.friendly_url || this.product.friendly_url === '') {
      this.product.friendly_url = this.slugifyPipe.transform(this.product.title);
    } else {
      this.product.friendly_url = this.slugifyPipe.transform(this.product.friendly_url);
    }

    this.product.shop_category = this.productService.convertArrayToString(this.itemsShop);
    this.product.tag = this.customService.getTagsProduct(this.tags);

    switch (this.product.is_special) {
      case '0':
        this.product.market_category = this.productService.convertArrayToString(this.itemsMarket);
        this.category.push(this.product.market_category);
        break;
      case '1':
        this.category.push(this.product.voucher_category);
        break;
      case '2':
        this.category.push(this.product.ticket_category);
        break;
    }
    this.category.push(this.product.shop_category);
    this.product.category = this.category.join(',');

    if (this.product.expiry_type === '2') {
      this.product.begin_day = this.productService.checkFormatDatetime(this.beginDay);
      this.product.end_day = this.productService.checkFormatDatetime(this.endDay);
    }

    this.productService.putproduct(this.product, this.fileImages).subscribe(
      data => {
        if (data.status) {
          swal({
            type: 'success',
            title: 'Sửa sản phẩm thành công',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/product/detail/' + data.id]);
          });
        } else {
          this.isLoading = false;
          swal({
            type: 'error',
            title: 'Sửa sản phẩm thất bại',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );
  }
}

class FileImage {
  filename = '';
  source: any;
  url = '';
  upload: number;
}
