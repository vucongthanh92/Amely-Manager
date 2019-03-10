import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { PROVINCES } from '../../../provinces';
import { GeocodingApiService } from '../../../services/geocodingApi.service';
import { DISTRICTS } from '../../../districts';
import { WARDS } from '../../../wards';
import swal from 'sweetalert2';
import { CustomService } from '../../../services/custom.service';

@Component({
  selector: 'app-add-store',
  templateUrl: './add-store.component.html',
  styleUrls: ['./add-store.component.css']
})
export class AddStoreComponent implements OnInit {
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
  public isLoading: Boolean = false;
  // tslint:disable-next-line:max-line-length
  constructor(private storeService: StoreService, private activeRoute: ActivatedRoute, private geocodingAPIService: GeocodingApiService,
    private _location: Location, public customService: CustomService) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.owner_id = params;
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

  createStore() {
    if (!this.title) {
      swal({
        type: 'warning',
        text: 'Tên chi nhánh không được để trống',
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
    } else {
      this.storeService.createStore(null, this.title, this.owner_id.id, this.store_phone, this.description,
        21.8042309, 103.1076525, this.store_address,
        this.province.provinceid, this.district.districtid, this.ward.wardid).subscribe(resp => {
        if (resp.status) {
          this.isLoading = true;
          swal({
            type: 'success',
            title: 'Tạo chi nhánh thành công',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this._location.back();
          });
        } else {
          this.isLoading = false;
          swal({
            type: 'error',
            title: 'Tạo chi nhánh thất bại',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });

    }
  }

}
