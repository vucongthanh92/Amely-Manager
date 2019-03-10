import { RequestAdvertise } from './../api/models/request-advertise';
import { RequestGetAdvertises } from './../api/models/request-get-advertises';
import { ApiService } from 'src/app/api/services/api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdvertiseService {

constructor(private api: ApiService) { }

  getAdvertises(advertise_type, approved, limit, offset, shop_id, status) {
    const requestGetAdvertises = new RequestGetAdvertises;
    requestGetAdvertises.advertise_type = advertise_type;
    requestGetAdvertises.approved = approved;
    requestGetAdvertises.limit = limit;
    requestGetAdvertises.offset = offset;
    requestGetAdvertises.shop_id = shop_id;
    requestGetAdvertises.status = status;
    return this.api.getAdvertises(requestGetAdvertises);
  }
  getAdvertise(adId: string) {
    return this.api.getAdvertise(adId);
  }
  deleteAdvertise(adId: string) {
    return this.api.deleteAdvertise(adId);
  }

  addAdvertise(request: any, image: any) {
    const uploadData = new FormData();
    if (image) {
      uploadData.append('image', image, image.name);
    }
    uploadData.append('advertise_type', request.advertise_type);
    uploadData.append('title', request.title);
    uploadData.append('owner_id', request.owner_id);
    uploadData.append('target_id', request.target_id);
    uploadData.append('budget', request.budget);
    uploadData.append('description', request.description);
    uploadData.append('cpc', request.cpc);
    uploadData.append('link', request.link);
    uploadData.append('amount', request.amount);
    uploadData.append('time_type', request.time_type);
    uploadData.append('start_time', request.start_time);
    uploadData.append('end_time', request.end_time);
    return this.api.addAdvertise(uploadData);
  }

}
