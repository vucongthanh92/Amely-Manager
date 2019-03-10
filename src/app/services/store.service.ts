import { Injectable } from '@angular/core';
import { ApiService } from '../api/services';
import { RequestCreateStore } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private api: ApiService) {

  }

  getStore(storeId: string) {
    return this.api.getStore(storeId);
  }

  createStore(id, title, owner_id, store_phone, description, lat, lng, store_address, store_province, store_district, store_ward) {
    const requestCreate = new RequestCreateStore();
      requestCreate.id = id;
      requestCreate.title = title;
      requestCreate.owner_id = owner_id;
      requestCreate.store_phone = store_phone;
      requestCreate.description = description;
      requestCreate.lat = lat;
      requestCreate.lng = lng;
      requestCreate.store_address = store_address;
      requestCreate.store_province = store_province;
      requestCreate.store_district = store_district;
      requestCreate.store_ward = store_ward;
    return this.api.createStore(requestCreate);
  }

  updateStore(id, title, owner_id, store_phone, description, lat, lng, store_address, store_province, store_district, store_ward ) {
    // tslint:disable-next-line:max-line-length
    return this.createStore(id, title, owner_id, store_phone, description, lat, lng, store_address, store_province, store_district, store_ward);
  }


  deleteStore(id: string) {
    return this.api.deleteStore(id);
  }
}
