import { RequestPutRedeem } from './../api/models/request-put-redeem';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/services';

@Injectable({
  providedIn: 'root'
})
export class RedeemService {

  constructor(private api: ApiService) { }

  getRedeem(redeemId: string) {
    return this.api.getRedeem(redeemId);
  }

  putRedeem(shop_id, store_id, offset, limit) {
    const requestPutRedeem = new RequestPutRedeem;
    requestPutRedeem.shop_id = shop_id;
    requestPutRedeem.store_id = store_id;
    requestPutRedeem.offset = offset;
    requestPutRedeem.limit = limit;
    return this.api.putRedeem(requestPutRedeem);
  }
}
