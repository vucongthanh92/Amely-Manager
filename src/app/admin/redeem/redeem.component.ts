import { CustomService } from './../../services/custom.service';
import { Component, OnInit } from '@angular/core';
import { RedeemService } from '../../services/redeem.service';
import { Shop } from '../../api/models';
import { ShopService } from '../../services/shop.service';
declare var $: any;
@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.css']
})
export class RedeemComponent implements OnInit {
  public redeems = [];
  public shops: Shop[];
  public shopID: any = '';
  public userCurrent: any;
  public offset = '0';
  public limit = '10';
  constructor(private redeemService: RedeemService, private shopService: ShopService, public customService: CustomService) { }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopService.getShops(1, -1, false, 9999, 0).subscribe(data => {
        if (data.hasOwnProperty('error')) {
          this.putRedeem();
        } else {
          this.shops = data;
          this.shopID = '';
          this.putRedeem();
        }
      });
    } else {
      this.shopID = this.customService.userCurrent.shop.id;
      this.putRedeem();
    }
  }

  onShopChange(value: string) {
    this.shopID = value;
    this.putRedeem();
}

  putRedeem() {
    this.redeemService.putRedeem(this.shopID, null, this.offset, this.limit).subscribe(data => {
      this.redeems = data;
    });
  }

}
