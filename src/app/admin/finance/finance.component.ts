import { ShopService } from 'src/app/services/shop.service';
import { FinanceService } from './../../services/finance.service';
import { CustomService } from 'src/app/services/custom.service';
import { Component, OnInit } from '@angular/core';
import { Shop } from '../../api/models';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent implements OnInit {
  public finances = [];
  public financesDisplay = [];
  public shopID: any;
  public shops: Shop[];
  public startTimeSelect: Date = new Date();
  public endTimeSelect: Date = new Date();
  public startDaySelect: Date = new Date();
  public endDaySelect: Date = new Date();
  public startDay = '';
  public endDay = '';
  public startTime = '';
  public endTime = '';
  public keywordFinances = '';
  public statusSort: Boolean = true;
  constructor(public customService: CustomService, public financeService: FinanceService, private shopService: ShopService) { }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopService.getShops(1, -1, false, 9999, 0).subscribe(data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.shops = data;
          this.shopID = '';
        }
      });
    } else {
      this.shopID = this.customService.userCurrent.shop.id;
      this.getFinance(this.shopID);
    }
  }

  onShopChange(value: string) {
    this.shopID = value;
    if (this.startDaySelect > this.endDaySelect) {
      this.customService.alert('Ngày bắt đầu không được lớn hơn ngày kết thúc', 2);
    } else {
      this.getFinance(this.shopID);
    }

  }

  getFinance(shopId) {
    const formatStartDay = new Date(this.startDaySelect);
    this.startDay = moment(formatStartDay, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD');

    const formatEndDay = new Date(this.endDaySelect);
    this.endDay = moment(formatEndDay, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD');

    const formatStartTime = new Date(this.startTimeSelect);
    this.startTime = moment(formatStartTime, 'Asia/Ho_Chi_Minh').format('H:mm:ss');

    const formatEndTime = new Date(this.endTimeSelect);
    this.endTime = moment(formatEndTime, 'Asia/Ho_Chi_Minh').format('H:mm:ss');

    const start_time = new Date(this.startDay + ' ' + this.startTime).getTime();
    const end_time = new Date(this.endDay + ' ' + this.endTime).getTime();
    // tslint:disable-next-line:radix
    this.financeService.getFinance(shopId, parseInt((start_time / 1000).toString()),
     // tslint:disable-next-line:radix
     parseInt((end_time / 1000).toString())).subscribe(data => {
      if (data.hasOwnProperty('error')) {
        this.customService.alert('Không có dữ liệu', 2);
      } else {
        this.finances = data;
        console.log(this.finances);
        this.financesDisplay = this.finances;
      }
    });
  }

  submitChooseDay() {
    this.getFinance(this.shopID);
  }

  formatTotal(total) {
    return this.customService.formatCurrency(total + '', 'VND');
  }
  convertStatus(index, subject_id) {
    return this.customService.alertStatus(index, subject_id);
  }

  searchFinanceByKeyWord() {
    const params: Array<string> = ['title', 'id', 'subject_id'];
    this.financesDisplay = this.customService.searchData(this.finances, this.keywordFinances, params);
  }

  sortTableByBranch(param: string) {
    let condition: string;
    if (this.statusSort === true) {
      condition = 'asc';
      this.statusSort = false;
    } else {
      condition = 'desc';
      this.statusSort = true;
    }
    this.financesDisplay.sort(this.customService.compareValuesSort(param, condition));
  }

  sortTableByNumber(param: string) {
    let condition: string;
    if (this.statusSort === true) {
      condition = 'asc';
      this.statusSort = false;
    } else {
      condition = 'desc';
      this.statusSort = true;
    }
    this.financesDisplay.sort(this.customService.compareValuesNumberSort(param, condition));
  }
}
