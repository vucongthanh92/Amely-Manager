import { Injectable } from '@angular/core';
import { ApiService } from '../api/services';
import { RequestGetFinance } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {

constructor(private api: ApiService) { }

  getFinance(shop_id, start_date, end_date) {
    const requestGetFinance = new RequestGetFinance();
    requestGetFinance.shop_id = shop_id;
    requestGetFinance.start_date = start_date;
    requestGetFinance.end_date = end_date;
    return this.api.getFinance(requestGetFinance);
  }
}
