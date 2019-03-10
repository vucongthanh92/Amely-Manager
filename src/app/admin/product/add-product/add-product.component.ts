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
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent implements OnInit {
  public marketCategories: Array<any>;
  public shopCategories: Array<any>;
  public voucherCategories: Category[];
  public ticketCategories: Category[];
  category: Array<string>;

  public shops: Shop[];
  public shopId = '';
  public product: Product;
  public imagesUrl: Array<string> = [];
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
  public userCurrent: any;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    public customService: CustomService,
    private shopService: ShopService,
    private router: Router,
    private slugifyPipe: SlugifyPipe,
    private formBuilder: FormBuilder,
  ) {
    this.product = this.productService.createNewObjectProduct(this.product);
    this.category = [];
    this.tags = [];
    this.itemsMarket = [];
    this.fileImages = [];

    this.statusProduct = this.customService.statusSelect;
    this.expiryTypeProduct = this.customService.expiryTypeProduct;
    this.productService.getAllProductGroup().subscribe(
      data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.productGroup = data;
        }
      }
    );
  }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopId = '';
      this.shopService.getShops(1, -1, false, 9999, 0).subscribe(data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.shops = data;
        }
      });
    } else {
      this.shopId = this.customService.userCurrent.shop.id;
      this.product.owner_id = this.shopId;
      this.getShopCategories();
    }
    this.categoryService.getCategoriesMarket(1, 0, 99999).subscribe(
      data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.marketCategories = this.productService.convertStringToArray(data);
        }
      }
    );

    this.categoryService.getCategoriesVoucher(1, 0, 99999).subscribe(
      data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.voucherCategories = data;
        }
      }
    );

    this.categoryService.getCategoriesTicket(1, 0, 99999).subscribe(
      data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.ticketCategories = data;
        }
      }
    );

    this.uploadImageForm = this.formBuilder.group({
      documentFile: new FormControl(File),
      items: this.formBuilder.array([this.createUploadDocuments()])
    });
  }

  createUploadDocuments(): FormGroup {
    return this.formBuilder.group({
      documentFile : File
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
    index --;
    swal({
      title: 'Bạn muốn xóa hình ảnh này của sản phẩm',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.value) {
        this.fileImages.splice(index, 1);
        this.items.removeAt(index);
      }
    });
  }

  fileSelectionEvent(fileInput: any, oldIndex) {
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
    this.shopId = this.product.owner_id;
    this.getShopCategories();
  }

  getShopCategories() {
    this.itemsShop = [];
    this.shopCategories = [];
    this.categoryService.getCategoriesByShop(this.shopId, 1, 0, 99999999).subscribe(
      data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.shopCategories = data;
          this.shopCategories = this.productService.convertStringToArray(data);
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

  createProduct() {
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

    this.product.tag = this.customService.getTagsProduct(this.tags);
    this.product.shop_category = this.productService.convertArrayToString(this.itemsShop);

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
            title: 'Tạo sản phẩm thành công',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/product/detail/' + data.id]);
          });
        } else {
          this.isLoading = false;
          swal({
            type: 'error',
            title: 'Tạo sản phẩm thất bại',
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
