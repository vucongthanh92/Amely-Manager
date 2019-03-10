import { RequestGetCount } from './../api/models/request-get-count';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/services';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor(private api: ApiService) { }

  getCount(shop_id, type) {
    const requestGetCount = new RequestGetCount();
    requestGetCount.shop_id = shop_id;
    requestGetCount.type = type;
    return this.api.getCount(requestGetCount);
  }
}
