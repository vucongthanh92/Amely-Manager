import { Injectable } from '@angular/core';
import { ApiService } from '../api/services';
import { RequestGetShops } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private api: ApiService) { }


  getProfile() {
    return this.api.getProfile();
  }


  createShop2(request: any, avatar: any, cover: any, store: any) {
    const uploadData = new FormData();
    if (avatar) {
      uploadData.append('avatar', avatar, avatar.name);
    }
    if (cover) {
      uploadData.append('cover', cover, cover.name);
    }
    if (request.id) {
      uploadData.append('id', request.id);
    }
    uploadData.append('title', request.title);
    uploadData.append('description', request.description);
    uploadData.append('shop_bidn', request.shop_bidn);
    uploadData.append('friendly_url', request.friendly_url);
    uploadData.append('shipping_method', request.shipping_method);
    uploadData.append('owner_ssn', request.owner_ssn);
    uploadData.append('status', request.status);
    uploadData.append('owner_id', request.owner_id);
    uploadData.append('cover', request.cover);
    uploadData.append('introduce', request.introduce);
    uploadData.append('policy', request.policy);
    uploadData.append('contact', request.contact);
    uploadData.append('lat', store.lat);
    uploadData.append('lng', store.lng);
    uploadData.append('store_phone', store.store_phone);
    uploadData.append('store_address', store.store_address);
    uploadData.append('store_province', store.store_province);
    uploadData.append('store_district', store.store_district);
    uploadData.append('store_ward', store.store_ward);
    return this.api.createShop(uploadData);
  }

  // createShop2(request: RequestCreateShop) {
  //   return this.api.createShop(request);
  // }

  updateShop(request: any, avatar: any, cover: any) {
    const uploadData = new FormData();
    if (avatar) {
      uploadData.append('avatar', avatar, avatar.name);
    }
    if (cover) {
      uploadData.append('cover', cover, cover.name);
    }
    if (request.id) {
      uploadData.append('id', request.id);
    }
    uploadData.append('title', request.title);
    uploadData.append('description', request.description);
    uploadData.append('shop_bidn', request.shop_bidn);
    uploadData.append('friendly_url', request.friendly_url);
    uploadData.append('shipping_method', request.shipping_method);
    uploadData.append('owner_ssn', request.owner_ssn);
    uploadData.append('status', request.status);
    uploadData.append('owner_id', request.owner_id);
    uploadData.append('cover', request.cover);
    uploadData.append('introduce', request.introduce);
    uploadData.append('policy', request.policy);
    uploadData.append('contact', request.contact);
    return this.api.createShop(uploadData);
  }

  deleteShop(id: string) {
    return this.api.deleteShop(id);
  }

  getShopsByLimitOffset(limit, offset) {
    return this.getShops(-1, -1, false, limit, offset);
  }

  getShopsApproved(limit, offset) {
    return this.getShops(1, -1, false, limit, offset);
  }

  getShops(approved, status, username, limit, offset) {
    const requestGetShops = new RequestGetShops();
    requestGetShops.approved = approved;
    requestGetShops.status = status;
    requestGetShops.username = username;
    requestGetShops.limit = limit;
    requestGetShops.offset = offset;
    return this.api.getShops(requestGetShops);
  }

  getShop(shopId: string) {
    return this.api.getShop(shopId);
  }

}
