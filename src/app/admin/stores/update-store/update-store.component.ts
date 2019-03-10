import { CustomService } from 'src/app/services/custom.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../../services/store.service';
import { GeocodingApiService } from '../../../services/geocodingApi.service';

import swal from 'sweetalert2';
import { PROVINCES } from '../../../provinces';
import { DISTRICTS } from '../../../districts';
import { WARDS } from '../../../wards';

@Component({
  selector: 'app-update-store',
  templateUrl: './update-store.component.html',
  styleUrls: ['./update-store.component.css']
})
export class UpdateStoreComponent implements OnInit {
  @ViewChild('phonePattern') phonePattern;
  public title = '';
  public store_phone = '';
  public store_address = '';
  public description = '';
  public province: any;
  public district: any;
  public ward: any;
  public owner_id: any;

  lat: number;
  lng: number;
  provinces: any;
  districts: any;
  wards: any;

  province_selected: string;
  district_selected: string;
  ward_selected: string;
  public store_id: any;
  public shop_id: string;
  public store: any;
  public isLoading: Boolean = false;

  // tslint:disable-next-line:max-line-length
  constructor(private storeService: StoreService, private activatedRoute: ActivatedRoute,
    private geocodingAPIService: GeocodingApiService, private router: Router, public customService: CustomService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.storeService.getStore(params.store_id).subscribe(resp => {
        this.store = resp.store;
        this.store_address = this.store.store_address;
        this.title = this.store.title;
        this.store_phone = this.store.store_phone;
        this.description = this.store.description;
        this.province = this.getProvinceByID( this.store.store_province);
        this.district = this.getDistrictByID( this.store.store_district);
        this.ward = this.getWardByID( this.store.store_ward);
      });
      this.store_id = params.store_id;
      this.shop_id = params.shop_id;
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

  getProvinceByID(id) {
    return this.provinces.filter(e => e.provinceid === id)[0];
  }
  getDistrictByID(id) {
    this.districts = DISTRICTS.filter(data => data.provinceid === this.province.provinceid);
    return this.districts.filter(e => e.districtid === id)[0];
  }
  getWardByID(id) {
    this.wards = WARDS.filter(data => data.districtid === this.district.districtid);
    return this.wards.filter(e => e.wardid === id)[0];
  }

  updateStore() {
    if (!this.title) {
      swal({
        type: 'warning',
        text: 'Tên cửa hàng không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
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
    } else if (!this.province) {
      swal({
        type: 'warning',
        text: 'PROVINCE không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (!this.district) {
      swal({
        type: 'warning',
        text: 'DISTRICT không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (!this.ward) {
      swal({
        type: 'warning',
        text: 'WARD không được để trống',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else {
      this.storeService.updateStore(this.store_id, this.title, this.shop_id, this.store_phone, this.description,
        // tslint:disable-next-line:max-line-length
        21.8042309, 103.1076525, this.store_address, this.province.provinceid, this.district.districtid, this.ward.wardid).subscribe(resp => {
        if (resp.status) {
          this.isLoading = true;
          swal({
            type: 'success',
            title: 'Cập nhật shop thành công',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/shop']);
          });
        } else {
          this.isLoading = false;
          swal({
            type: 'error',
            title: 'Cập nhật shop thất bại',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    }
  }

}
