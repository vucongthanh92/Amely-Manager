import { RequestProductGroup } from './../api/models/request-product-group';
import { RequestGetProductGroups } from './../api/models/request-get-product-groups';
import { Injectable } from '@angular/core';
import { ApiService } from '../api/services';

@Injectable({
  providedIn: 'root'
})
export class ProductGroupService {

constructor(private api: ApiService) { }

  getProductGroups(status, offset, limit) {
    const requestGet = new RequestGetProductGroups();
    requestGet.status = status;
    requestGet.offset = offset;
    requestGet.limit = limit;
    return this.api.getProductGroups(requestGet);
  }
  getProductGroup(pgId: string) {
    return this.api.getProductGroup(pgId);
  }
  addProductGroup(title, description, percent, price, status) {
    const requestAdd = new RequestProductGroup();
      requestAdd.title = title;
      requestAdd.description = description;
      requestAdd.percent = percent;
      requestAdd.price = price;
      requestAdd.status = status;
    return this.api.addProductGroup(requestAdd);
  }
  deleteProductGroup(pgId: string) {
    return this.api.deleteProductGroup(pgId);
  }
}
