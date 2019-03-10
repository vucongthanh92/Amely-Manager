import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/api/services/api.service';
import { Category, requestEditApproval } from '../api/models';
import { RequestGetCategories } from '../api/models';
import { CustomService } from './custom.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private api: ApiService,
    private customService: CustomService
  ) { }

  getCategory(id: string) {
    return this.api.getCategory(id);
  }

  putCategory(category: Category, logo: any) {
    const uploadData = new FormData();
    if (category.id) {
      uploadData.append('id', category.id);
    }
    if (logo) {
      uploadData.append('logo', logo, logo.name);
    }

    uploadData.append('owner_id', category.owner_id);
    uploadData.append('type', category.type);
    uploadData.append('title', category.title);
    uploadData.append('description', category.description);
    uploadData.append('subtype', category.subtype);
    uploadData.append('friendly_url', category.friendly_url);
    uploadData.append('sort_order', category.sort_order);
    uploadData.append('enabled', category.enabled);
    uploadData.append('parent_id', category.parent_id);
    uploadData.append('creator_id', category.creator_id);
    return this.api.createCategory(uploadData);
  }

  turnOn(subject_id: any, subject_type: any) {
    const reqApproval = new requestEditApproval();
    reqApproval.subject_id = subject_id;
    reqApproval.subject_type = subject_type;
    return this.api.editTurnOn(reqApproval);
  }

  turnOff(subject_id: any, subject_type: any) {
    const reqApproval = new requestEditApproval();
    reqApproval.subject_id = subject_id;
    reqApproval.subject_type = subject_type;
    return this.api.editTurnOff(reqApproval);
  }

  deleteCategory(id: string) {
    return this.api.deleteCategory(id);
  }

  getCategories(shop_id: string, type: string, offset: number, limit: number, keyword: string) {
    const requestGetCategories = new RequestGetCategories();
    requestGetCategories.shop_id = shop_id;
    requestGetCategories.type = type;
    requestGetCategories.offset = offset;
    requestGetCategories.limit = limit;
    requestGetCategories.keyword = keyword;
    return this.api.getCategories(requestGetCategories);
  }

  getCategoriesByShop(shop_id: string, enabled: number, offset: number, limit: number) {
    const requestGetCategories = new RequestGetCategories();
    requestGetCategories.shop_id = shop_id.toString();
    requestGetCategories.type = '3';
    requestGetCategories.enabled = enabled;
    requestGetCategories.offset = offset;
    requestGetCategories.limit = limit;
    return this.api.getCategories(requestGetCategories);
  }

  getCategoriesMarket(enabled: number, offset: number, limit: number) {
    const requestGetCategories = new RequestGetCategories();
    requestGetCategories.shop_id = '0';
    requestGetCategories.type = '0';
    requestGetCategories.enabled = enabled;
    requestGetCategories.offset = offset;
    requestGetCategories.limit = limit;
    return this.api.getCategories(requestGetCategories);
  }

  getCategoriesVoucher(enabled: number, offset: number, limit: number) {
    const requestGetCategories = new RequestGetCategories();
    requestGetCategories.shop_id = '0';
    requestGetCategories.type = '1';
    requestGetCategories.enabled = enabled;
    requestGetCategories.offset = offset;
    requestGetCategories.limit = limit;
    return this.api.getCategories(requestGetCategories);
  }

  getCategoriesTicket(enabled: number, offset: number, limit: number) {
    const requestGetCategories = new RequestGetCategories();
    requestGetCategories.shop_id = '0';
    requestGetCategories.type = '2';
    requestGetCategories.enabled = enabled;
    requestGetCategories.offset = offset;
    requestGetCategories.limit = limit;
    return this.api.getCategories(requestGetCategories);
  }
}
