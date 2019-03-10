import { CustomService } from './../../services/custom.service';
import { DashboardService } from './../../services/dashboard.service';
import { ShopService } from './../../services/shop.service';
import { Component, OnInit } from '@angular/core';
import { Shop } from '../../api/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public shops: Shop[];
  public shopID: any = '';
  public dashboard: any;
  public userCurrent: any;
  constructor(private shopService: ShopService, private dashBoardService: DashboardService, public customService: CustomService) { }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopService.getShops(1, -1, false, 9999, 0).subscribe(data => {
        if (data.hasOwnProperty('error')) {
          this.getDashboard();
        } else {
          this.shops = data;
          this.shopID = '';
          this.getDashboard();
        }
      });
    } else {
      this.shopID = this.customService.userCurrent.shop.id;
      this.getDashboard();
    }
  }

  onShopChange(value: string) {
      this.shopID = value;
      this.getDashboard();
  }

  getDashboard() {
    this.dashBoardService.getDashboard(this.shopID).subscribe(data => {
      this.dashboard = data;
    });
  }

  formatAmount(amount) {
    return this.customService.formatCurrency(amount + '' , 'VND');
  }

}
