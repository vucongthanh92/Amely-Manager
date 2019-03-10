import { Component, OnInit } from '@angular/core';
import { Promotion } from 'src/app/api/models/promotion';
import { Shop } from 'src/app/api/models/shop';

import { PromotionService } from 'src/app/services/promotion.service';
import { ShopService } from 'src/app/services/shop.service';
import { CustomService } from 'src/app/services/custom.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})

export class PromotionComponent implements OnInit {
  public promotions: Promotion[];
  public shops: Shop[];
  public shopId: string;

  constructor(
    private promotionService: PromotionService,
    private shopService: ShopService,
    public customService: CustomService
  ) {
    this.shops = [];
  }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.shopId = '';
      this.shopService.getShops(1, -1, false, 9999, 0).subscribe(data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.shops = data;
          this.shopId = this.shops[0].id;
          this.getListPromotions(this.shopId, 0, 9999);
        }
      });
    } else {
      this.shopId = this.customService.userCurrent.shop.id;
      this.getListPromotions(this.shopId, 0, 9999);
    }
  }

  getListPromotions(shopId: string, offset: number, limit: number) {
    swal({
      title: 'Vui lòng đợi...'
    });
    swal.showLoading();
    this.promotions = [];
    this.promotionService.getPromotions({
      shop_id: shopId,
      offset: offset,
      limit: limit
    }).subscribe(
      data => {
        swal.close();
        if (data.length > 0) {
          this.promotions = data;
        }
      }
    );
  }

  changeShopToPromotion() {
    this.getListPromotions(this.shopId, 0, 9999);
  }
}
