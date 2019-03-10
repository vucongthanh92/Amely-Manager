import { ApiService } from 'src/app/api/services/api.service';
import { Injectable } from '@angular/core';
import { RequestGetSOs } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class SoService {

constructor(private api: ApiService) { }

  getSOs(shop_id, store_id, status, offset, limit) {
    const requestGetSOs = new RequestGetSOs();
    requestGetSOs.shop_id = shop_id;
    requestGetSOs.store_id = store_id;
    requestGetSOs.status = status;
    requestGetSOs.offset = offset;
    requestGetSOs.limit = limit;
    return this.api.getSOs(requestGetSOs);
  }

  getSO(soId: string) {
    return this.api.getSO(soId);
  }
}
