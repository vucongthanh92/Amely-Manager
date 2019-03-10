import { CustomService } from './../../../services/custom.service';
import { SlugifyPipe } from 'src/app/slugify.pipe';
import { UserService } from './../../../services/user.service';
import { Shop } from './../../../api/models/shop';
import { GeocodingApiService } from './../../../services/geocodingApi.service';
import { DISTRICTS } from './../../../districts';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ShopService } from '../../../services/shop.service';
import { PROVINCES } from '../../../provinces';
import { WARDS } from '../../../wards';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Store } from '../../../api/models';
declare var $: any;
declare var tinymce: any;
@Component({
  selector: 'app-add-shop',
  templateUrl: './add-shop.component.html',
  styleUrls: ['./add-shop.component.css']
})
export class AddShopComponent implements OnInit {
  @ViewChild('phonePattern') phonePattern;
  public shop: Shop;
  public store: Store;
  public title: string;
  public shop_bidn = '';
  public store_phone = '';
  public store_address = '0';
  public friendly_url = '';
  public description = '';
  public policy = '';
  public contact = '';
  public introduce = '';
  public owner_ssn = '';
  public userSelect: string;

  public is_shop = false;
  public province: any;
  public provinceaaa: any;
  public district: any;
  public ward: any;
  public avatar: any;
  public avatarUrl: string;
  public cover: any;
  public coverUrl: string;
  public user: any;
  lat: number;
  lng: number;
  provinces: any;
  districts: any;
  wards: any;
  province_selected: string;
  district_selected: string;
  ward_selected: string;
  public isLoading: Boolean = false;
  // tslint:disable-next-line:max-line-length
  constructor(private shopService: ShopService, private userService: UserService, private geocodingAPIService: GeocodingApiService, private router: Router,
    private slugifyPipe: SlugifyPipe, public customService: CustomService
    ) {

  }

  ngOnInit() {
    $('.select2').select2();
    $('#tags').tagsinput();
    tinymce.remove();
    tinymce.init({
      selector: 'textarea',
      theme: 'modern',
      height: 100,
    });
    this.provinces = PROVINCES;
    this.updateLatLngFromAddress();
  }


  updateLatLngFromAddress() {
    this.geocodingAPIService
      // tslint:disable-next-line:max-line-length
      // .findFromAddress(this.address.value, this.postalCode.value, this.selectedPlace.value.place, this.selectedPlace.value.province, this.selectedPlace.value.region, this.selectedPlace.value.country)
      .findFromAddress(null, null, null, null, null, 'Hồ Chí Minh')
      .subscribe(response => {
        if (response.status === 'OK') {
          this.lat = response.results[0].geometry.location.lat;
          this.lng = response.results[0].geometry.location.lng;
        } else if (response.status === 'ZERO_RESULTS') {
        } else {
        }
      });
  }

  onUserSearch() {
    this.userService.getUser(this.userSelect).subscribe(
      data => {
        if (this.userSelect) {
          if (data.hasOwnProperty('status')) {
            swal({
              type: 'warning',
              text: 'Không tìm thấy người dùng !',
              showConfirmButton: false,
              confirmButtonColor: '#049F0C',
              confirmButtonText: 'Yes',
            });
            this.is_shop = false;
          } else {
            if (data.shop) {
              swal({
                type: 'warning',
                text: 'Người dùng đã có cửa hàng !',
                showConfirmButton: false,
                confirmButtonColor: '#049F0C',
                confirmButtonText: 'Yes',
              });
              this.user = data;
              this.is_shop = false;
            } else {
              this.user = data;
              this.is_shop = true;
            }
          }
        } else {
          swal({
            type: 'warning',
            text: 'Thông tin tìm kiếm không được để trống!',
            showConfirmButton: false,
            confirmButtonColor: '#049F0C',
            confirmButtonText: 'Yes',
          });
          this.is_shop = false;

        }
      });

  }
  onProvinceChange(province) {
    this.province_selected = province.name;
    this.district_selected = null;
    this.ward_selected = null;
    this.districts = DISTRICTS.filter(data => data.provinceid === province.provinceid);
    this.wards = [];
    this.refeshMap();

  }

  onDistrictChange(district) {
    this.wards = WARDS.filter(data => data.districtid === district.districtid);
    this.district_selected = district.name;
    this.ward_selected = null;
    this.refeshMap();
  }

  convertToFriendlyURL(params: string) {
    this.friendly_url = this.slugifyPipe.transform(params);
  }

  onWardChange(ward) {
    // tslint:disable-next-line:radix
    const number = parseInt(ward.name);
    this.ward_selected = ward.name;
    if (number >= 0) {
      this.ward_selected = 'Phường ' + number;
    }
    this.refeshMap();
  }

  refeshMap() {
    this.geocodingAPIService
      // tslint:disable-next-line:max-line-length
      // .findFromAddress(this.address.value, this.postalCode.value, this.selectedPlace.value.place, this.selectedPlace.value.province, this.selectedPlace.value.region, this.selectedPlace.value.country)
      .findFromAddress(null, null, null, this.ward_selected, this.district_selected, this.province_selected)
      .subscribe(response => {
        if (response.status === 'OK') {
          this.lat = response.results[0].geometry.location.lat;
          this.lng = response.results[0].geometry.location.lng;
        } else if (response.status === 'ZERO_RESULTS') {
        } else {
        }
      });
  }

  detectFilesAvatar(event) {
    const files = event.target.files;
    this.avatar = files[0];
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.avatarUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }
  detectFilesCover(event) {
    const files = event.target.files;
    this.cover = files[0];
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.coverUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    }
  }

  createShop() {
    if (!this.title) {
      swal({
        type: 'warning',
        text: 'Tên cửa hàng không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (!this.province) {
      swal({
        type: 'warning',
        text: 'Thành Phố/Tỉnh không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (!this.district) {
      swal({
        type: 'warning',
        text: 'Quận/Huyện không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (!this.ward) {
      swal({
        type: 'warning',
        text: 'Phường/Xã không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (!this.owner_ssn) {
      swal({
        type: 'warning',
        title: 'Chứng minh thư không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (!this.shop_bidn) {
      swal({
        type: 'warning',
        title: 'Mã số thuế không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (!this.store_phone) {
      swal({
        type: 'warning',
        title: 'Số điện thoại không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (this.phonePattern.errors) {
      swal({
        type: 'warning',
        title: 'Số điện thoại không đúng định dạng !',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      this.shop = new Shop();
      this.store = new Store();
      this.shop.owner_id = this.user.id;
      this.shop.title = this.title;
      this.shop.shop_bidn = this.shop_bidn;
      this.shop.friendly_url = this.friendly_url;
      this.shop.shipping_method = 1;
      this.shop.owner_ssn = this.owner_ssn;
      this.shop.status = 1;
      this.shop.description = this.description;
      this.shop.introduce = this.introduce;
      this.shop.policy = this.policy;
      this.shop.contact = this.contact;
      this.store.store_phone = this.store_phone;
      this.store.lat = this.lat;
      this.store.lng = this.lng;
      this.store.store_address = this.store_address;
      this.store.store_province = this.province.provinceid;
      this.store.store_district = this.district.districtid;
      this.store.store_ward = this.ward.wardid;
      this.shopService.createShop2(this.shop, this.avatar, this.cover, this.store).subscribe(resp => {
        if (resp.status) {
          this.isLoading = true;
          swal({
            type: 'success',
            title: 'Tạo cửa hàng thành công',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/shop']);
          });
        } else {
          this.isLoading = false;
          swal({
            type: 'error',
            title: 'Tạo cửa hàng thất bại',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });

      //   const request = new RequestCreateShop();
      //   request.owner_id = this.user.id;
      //   request.title = this.title;
      //   request.description = this.description;
      //   request.shop_bidn = this.shop_bidn;
      //   request.friendly_url = this.friendly_url;
      //   request.shipping_method = '1';
      //   request.owner_ssn = this.owner_ssn;
      //   request.status = '1';
      //   request.lat = this.lat.toString();
      //   request.lng = this.lng.toString();
      //   request.store_address = this.store_address;
      //   request.store_phone = this.store_phone;
      //   request.store_province = this.province.provinceid;
      //   request.store_district = this.district.districtid;
      //   request.store_ward = this.ward.wardid;
      //   this.shopService.createShop2(request).subscribe(resp => {

      //     if (resp.status) {
      //       swal({
      //         type: 'success',
      //         title: 'Tạo shop thành công',
      //         showConfirmButton: false,
      //         timer: 2000
      //       }).then(() => {
      //         this.router.navigate(['/shop']);
      //       });
      //     } else {
      //       swal({
      //         type: 'error',
      //         title: 'Tạo shop thất bại',
      //         showConfirmButton: false,
      //         timer: 2000
      //       });
      //     }
      //   });
      // }

    }
  }

}
