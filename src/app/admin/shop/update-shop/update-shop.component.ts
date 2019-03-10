import { Shop } from './../../../api/models/shop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../services/shop.service';
import { Store } from '../../../api/models';
import { Location } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;
declare var tinymce: any;
@Component({
  selector: 'app-update-shop',
  templateUrl: './update-shop.component.html',
  styleUrls: ['./update-shop.component.css']
})
export class UpdateShopComponent implements OnInit {
  public avatar: any;
  public avatarUrl = '';
  public cover: any;
  public coverUrl = '';
  public store: Store;
  public title = '';
  public shop_bidn = '';
  public store_address = '';
  public friendly_url = '';
  public description = '';
  public policy = '';
  public contact = '';
  public introduce = '';
  public owner_ssn = '';
  public lat = 10.7994298;
  public lng = 106.6860334;
  public shop = new Shop();
  public shops = new Shop();
  public stores: any;
  public isLoading: Boolean = false;
  constructor(private route: ActivatedRoute, private shopService: ShopService, private _location: Location) { }


  ngOnInit() {
    $('.select2').select2();
    $('#tags').tagsinput();
    tinymce.remove();
    tinymce.init({
      selector: 'textarea',
      theme: 'modern',
      height: 300,
    });
    this.getShop();
  }

  getShop() {
    this.route.params.subscribe(params => {
      this.shopService.getShop(params.id).subscribe(
        data => {
          this.shop = data;
          this.title = this.shop.title;
          this.description = this.shop.description;
          this.policy = this.shop.policy;
          this.contact = this.shop.contact;
          this.introduce = this.shop.introduce;
          this.shop_bidn = this.shop.shop_bidn;
          this.friendly_url = this.shop.friendly_url;
          this.owner_ssn = this.shop.owner_ssn;
          this.stores = data.stores;
        }
      );
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

  updateShop() {
      this.shops = new Shop();
      this.shop.id = this.shop.id;
      this.shop.owner_id = this.shop.owner_id;
      this.shop.title = this.title;
      this.shop.shop_bidn = this.shop_bidn;
      this.shop.friendly_url = this.friendly_url;
      this.shop.description = this.description;
      this.shop.policy = this.policy;
      this.shop.contact = this.contact;
      this.shop.introduce = this.introduce;
      this.shop.shipping_method = 1;
      this.shop.owner_ssn = this.owner_ssn;
      this.shop.status = 1;
      this.shopService.updateShop(this.shop, this.avatar, this.cover).subscribe(resp => {
        if (resp.status) {
          this.isLoading = true;
          swal({
            type: 'success',
            title: 'Cập nhật cửa hàng thành công',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this._location.back();
          });
        } else {
          this.isLoading = false;
          swal({
            type: 'error',
            title: 'Cập nhật cửa hàng thất bại',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    }

}
