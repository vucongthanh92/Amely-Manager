import { CustomService } from './../../../services/custom.service';
import { Router } from '@angular/router';
import { Advertise } from './../../../api/models/advertise';
import { Shop } from './../../../api/models/shop';
import { ShopService } from './../../../services/shop.service';
import { AdvertiseService } from './../../../services/advertise.service';
import { Component, OnInit } from '@angular/core';
import { RequestGetProducts, Product } from '../../../api/models';
import { ProductService } from '../../../services/product.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-add-advertise',
  templateUrl: './add-advertise.component.html',
  styleUrls: ['./add-advertise.component.css']
})
export class AddAdvertiseComponent implements OnInit {
  public startTimeSelect: Date = new Date();
  public endTimeSelect: Date = new Date();
  public startDaySelect: Date = new Date();
  public endDaySelect: Date = new Date();
  public startDay = '';
  public endDay = '';
  public startTime = '';
  public endTime = '';
  public advertise: Advertise;
  public products: Product[];
  public shops: Shop[];
  public selectedType = '';
  public selectedIDShop = '';
  public selectedIDProduct = '';
  public image: any;
  public imageUrl = '';
  public title = '';
  public budget = '';
  public cpc = '';
  public link = '';
  public time_type = '0';
  public isLoading: Boolean = false;
  public userCurrent: any;

  public shopId;
  // tslint:disable-next-line:max-line-length
  constructor(
    private advertiseService: AdvertiseService,
    private shopService: ShopService,
    private productService: ProductService,
    private router: Router,
    public customService: CustomService
  ) { }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopService.getShopsApproved(10, 0).subscribe( data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.shops = data;
        }
      });
    } else {
      this.selectedIDShop = this.customService.userCurrent.shop.id;
      this.getProducts();
    }
  }

  selectType(value: string) {
    this.selectedType = value;
  }

  selectTime(value: string) {
    this.time_type = value;
  }

  selectShop(value: string) {
    this.selectedIDShop = value;
    this.getProducts();
  }

  getProducts() {
    const requestGetProducts = new RequestGetProducts();
    requestGetProducts.offset = 0;
    requestGetProducts.limit = 99999999;
    requestGetProducts.category_id = 0;
    requestGetProducts.status = '1';
    requestGetProducts.shop_id = this.selectedIDShop;
    requestGetProducts.type_product = 'all';
    requestGetProducts.approved = 1;
    this.productService.getProducts(requestGetProducts).subscribe( data => {
      if (data.hasOwnProperty('error')) {
      } else {
        this.products = data;
      }
    });
  }

  selectProduct(value: string) {
    this.selectedIDProduct = value;
  }

  detectFilesImage(event) {
    const files = event.target.files;
    this.image = files[0];
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  addAdvertise() {
    if (!this.selectedType) {
      swal({
        type: 'warning',
        text: 'Hãy chọn loại quảng cáo',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (!this.selectedIDShop) {
      swal({
        type: 'warning',
        text: 'Hãy chọn cửa hàng',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (this.selectedType === '0' && !this.selectedIDProduct) {
        swal({
          type: 'warning',
          text: 'Hãy chọn sản phẩm',
          showConfirmButton: false,
          confirmButtonColor: '#049F0C',
          confirmButtonText: 'Yes',
        });
    } else if (!this.title) {
      swal({
        type: 'warning',
        text: 'Tên quảng cáo không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (!this.budget) {
      swal({
        type: 'warning',
        text: 'Ngân sách không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    }  else if (!this.cpc) {
      swal({
        type: 'warning',
        text: 'Cpc không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (this.cpc >= this.budget) {
      swal({
        type: 'warning',
        text: 'Cpc phải nhỏ hơn ngân sách',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (this.startDaySelect > this.endDaySelect) {
      swal({
        type: 'warning',
        text: 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    }  else {
      this.isLoading = true;
      const formatStartDay = new Date(this.startDaySelect);
      this.startDay = moment(formatStartDay, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD');

      const formatEndDay = new Date(this.endDaySelect);
      this.endDay = moment(formatEndDay, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD');

      const formatStartTime = new Date(this.startTimeSelect);
      this.startTime = moment(formatStartTime, 'Asia/Ho_Chi_Minh').format('H:mm:ss');

      const formatEndTime = new Date(this.endTimeSelect);
      this.endTime = moment(formatEndTime, 'Asia/Ho_Chi_Minh').format('H:mm:ss');

      const start_time = new Date(this.startDay + ' ' + this.startTime).getTime();
      const end_time = new Date(this.endDay + ' ' + this.endTime).getTime();

      this.advertise = new Advertise();
      this.advertise.advertise_type = this.selectedType;
      this.advertise.title = this.title;
      this.advertise.owner_id = this.selectedIDShop;
      if (this.selectedType === '0') {
        // tslint:disable-next-line:no-unused-expression
        this.advertise.target_id = this.selectedIDProduct;
        this.link = null;
      }
      if (this.selectedType === '1') {
        // tslint:disable-next-line:no-unused-expression
        this.advertise.target_id = this.selectedIDShop;
        this.link = null;
      }
      if (this.selectedType === '2') {
        // tslint:disable-next-line:no-unused-expression
        this.advertise.target_id = null;
      }
      this.advertise.budget = this.budget;
      this.advertise.cpc = this.cpc;
      this.advertise.link = this.link;
      this.advertise.description = '';
      this.advertise.amount = '0';
      this.advertise.time_type = this.time_type;
      // tslint:disable-next-line:radix
      this.advertise.start_time = parseInt((start_time / 1000).toString());
      // tslint:disable-next-line:radix
      this.advertise.end_time = parseInt((end_time / 1000).toString());
      swal({
        title: 'Vui lòng đợi...'
      });
      swal.showLoading();
      this.advertiseService.addAdvertise(this.advertise, this.image).subscribe(data => {
        if (data.status) {
          swal({
            type: 'success',
            title: 'Tạo quảng cáo thành công',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            swal.close();
            this.router.navigate(['/advertise']);
          });
        } else {
          this.isLoading = false;
          swal.close();
          swal({
            type: 'error',
            title: 'Tạo quảng cáo thất bại',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    }
  }

}
