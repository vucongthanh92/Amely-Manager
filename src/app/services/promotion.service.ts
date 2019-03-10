import { Injectable } from '@angular/core';
import { RequestPutPromotion } from 'src/app/api/models/request-put-promotion';
import { ApiService } from 'src/app/api/services/api.service';
import { CustomService } from 'src/app/services/custom.service';
import { RequestPostPromotion } from 'src/app/api/models/request-post-promotion';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor(
    private api: ApiService,
    private customService: CustomService
  ) { }

  getPromotion(promotionId: string) {
    return this.api.getPromotion(promotionId);
  }

  getPromotions(requestPutPromotion: RequestPutPromotion) {
    return this.api.getPromotions(requestPutPromotion);
  }

  createNewObjectPromotion(requestPostPromotion: RequestPostPromotion) {
    requestPostPromotion = new RequestPostPromotion;
    requestPostPromotion.shop_id = '';
    requestPostPromotion.title = '';
    requestPostPromotion.time_type = '0';
    requestPostPromotion.start_time = '';
    requestPostPromotion.end_time = '';
    requestPostPromotion.status = '1';
    requestPostPromotion.items = [{
      promotion_item_id: null,
      product_id: null,
      product_price: 0,
      percent: 0,
      price: 0
    }];
    return requestPostPromotion;
  }

  requestPostPromotion(requestPostPromotion: RequestPostPromotion) {
    return this.api.addPromotion(requestPostPromotion);
  }

  deletePromotion(promotionId: string, promotionItemId: string = null) {
    return this.api.deletePromotion({
      promotionId: promotionId,
      promotionItemId: promotionItemId
    });
  }

  createItemPromotion(requestPostPromotion: RequestPostPromotion) {
    requestPostPromotion.items.push({
      promotion_item_id: null,
      product_id: null,
      product_price: 0,
      percent: 0,
      price: 0
    });
    return requestPostPromotion;
  }

  convertTimePromotion(getDay: Date, getTime: Date) {
    let result: string;
    const formatDay = new Date(getDay);
    const formatTime = new Date(getTime);
    const valueDay = moment(formatDay, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
    const valueTime = moment(formatTime, 'Asia/Ho_Chi_Minh').format('H:mm:ss');
    result = (new Date(valueDay + ' ' + valueTime).getTime() / 1000).toString();
    return result;
  }

  checkPromotionTime(startTime: Date, endTime: Date, timeType: string) {
    if (timeType === '0') {
      return true;
    }
    const startTemp = new Date(startTime);
    const endTemp = new Date(endTime);
    const hourStart = moment(startTemp, 'Asia/Ho_Chi_Minh').format('HH');
    const minuteStart = moment(startTemp, 'Asia/Ho_Chi_Minh').format('mm');
    const hourEnd = moment(endTemp, 'Asia/Ho_Chi_Minh').format('HH');
    const minuteEnd = moment(endTemp, 'Asia/Ho_Chi_Minh').format('mm');
    if (hourStart > hourEnd) {
      return false;
    }
    if (hourStart === hourEnd) {
      if (minuteStart >= minuteEnd) {
        return false;
      }
    }
    return true;
  }

  convertTimeStampToDate(value: string) {
    const dateTemp = Number(value) * 1000;
    return new Date(dateTemp);
  }

  async checkParamPromotion(requestPostPromotion: RequestPostPromotion) {
    if (!requestPostPromotion.title) {
      swal({
        type: 'error',
        title: 'Bạn chưa điền tên chương trình khuyến mãi',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    if (!requestPostPromotion.start_time) {
      swal({
        type: 'error',
        title: 'Bạn chưa chọn ngày giờ bắt đầu',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    if (!requestPostPromotion.end_time) {
      swal({
        type: 'error',
        title: 'Bạn chưa chọn ngày kết thúc',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    if (Number(requestPostPromotion.start_time) >= Number(requestPostPromotion.end_time)) {
      swal({
        type: 'error',
        title: 'Thời gian bắt đầu không được nhỏ hơn thời gian kết thúc',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    if (!requestPostPromotion.time_type) {
      swal({
        type: 'error',
        title: 'Bạn chưa chọn loại chương trình khuyến mãi',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    if (!requestPostPromotion.shop_id) {
      swal({
        type: 'error',
        title: 'Bạn chưa chọn shop cho chương trình khuyến mãi',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    let error: Boolean = true;
    await requestPostPromotion.items.map(
      (data, index) => {
        if (!data.product_id) {
          swal({
            type: 'error',
            title: 'Bạn chưa chọn sản phẩm cho mục khuyến mãi ' + (index + 1),
            showConfirmButton: false,
            timer: 1500
          });
          error = false;
        }
        if ((!data.percent) && (!data.price)) {
          swal({
            type: 'error',
            title: 'Bạn chưa điền giá hoặc phần trăm cho mục khuyến mãi ' + (index + 1),
            showConfirmButton: false,
            timer: 1500
          });
          error = false;
        }
        if ((data.percent) && (data.percent > 100)) {
          swal({
            type: 'error',
            title: 'Phần trăm khuyến mãi không được lớn hơn 100% tại mục khuyến mãi ' + (index + 1),
            showConfirmButton: false,
            timer: 1500
          });
          error = false;
        }
        if ((data.price) && (data.price > data.product_price)) {
          swal({
            type: 'error',
            title: 'Giá khuyến mãi không được lớn hơn giá sản phẩm tại mục khuyến mãi ' + (index + 1),
            showConfirmButton: false,
            timer: 1500
          });
          error = false;
        }
      }
    );

    if (error === false) {
      return false;
    }

    return true;
  }
}
