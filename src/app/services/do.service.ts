import { Injectable } from '@angular/core';
import { ApiService } from '../api/services';
import { RequestGetDOs } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class DoService {

constructor(private api: ApiService) { }

  getDOs(shop_id, store_id, status, offset, limit) {
    const requestGetDOs = new RequestGetDOs();
    requestGetDOs.shop_id = shop_id;
    requestGetDOs.store_id = store_id;
    requestGetDOs.status = status;
    requestGetDOs.offset = offset;
    requestGetDOs.limit = limit;
    return this.api.getDOs(requestGetDOs);
  }

  getDO(doId: string) {
    return this.api.getDO(doId);
  }
}
