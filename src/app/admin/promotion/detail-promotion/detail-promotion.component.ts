import { Component, OnInit } from '@angular/core';
import { Shop } from 'src/app/api/models/shop';
import { Promotion } from 'src/app/api/models/promotion';
import { RequestPostPromotion } from 'src/app/api/models/request-post-promotion';

import { PromotionService } from 'src/app/services/promotion.service';
import { CustomService } from 'src/app/services/custom.service';
import { ShopService } from 'src/app/services/shop.service';

import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-detail-promotion',
  templateUrl: './detail-promotion.component.html',
  styleUrls: ['./detail-promotion.component.css']
})
export class DetailPromotionComponent implements OnInit {
  public promotion: Promotion;
  public requestPostPromotion: RequestPostPromotion;
  public shop: Shop;
  public labelUpdate: String = '';

  constructor(
    private promotionService: PromotionService,
    private customService: CustomService,
    private shopService: ShopService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.promotion = new Promotion();
    this.shop = new Shop();
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.promotionService.getPromotion(params.id).subscribe(
        data => {
          if (this.customService.userCurrent.type !== 'admin' && this.customService.userCurrent.shop.id !== data.owner_id) {
            swal({
              type: 'error',
              title: 'Bạn không có quyền xem nội dung này',
              showConfirmButton: false,
              timer: 1500
            });
            this.router.navigate(['/promotion/']);
          }
          if (data.hasOwnProperty('error')) {
          } else {
            this.promotion = data;
            this.getShopByPromotion(this.promotion.owner_id);
            if (this.promotion.status === '0') {
              this.labelUpdate = 'Mở';
            } else {
              this.labelUpdate = 'Đóng';
            }
          }
        }
      );
    });
  }

  getShopByPromotion(shopId: string) {
    this.shopService.getShop(shopId).subscribe(
      shop => {
        this.shop = shop;
      }
    );
  }

  updatePromotion() {
    this.requestPostPromotion = new RequestPostPromotion;
    this.requestPostPromotion.promotion_id = this.promotion.id;
    this.requestPostPromotion.shop_id = this.promotion.owner_id;
    this.requestPostPromotion.title = this.promotion.title;
    this.requestPostPromotion.time_type = this.promotion.time_type;
    this.requestPostPromotion.start_time = this.promotion.start_time;
    this.requestPostPromotion.end_time = this.promotion.end_time;

    if (this.promotion.status === '0') {
      this.requestPostPromotion.status = '1';
    } else {
      this.requestPostPromotion.status = '0';
    }

    this.promotionService.requestPostPromotion(this.requestPostPromotion).subscribe(
      data => {
        console.log(data);
        
        if (data.status) {
          swal({
            type: 'success',
            title: 'Cập nhật chương trình khuyến mãi thành công',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/promotion']);
          });
        } else {
          swal({
            type: 'error',
            title: 'Cập nhật chương trình khuyến mãi thất bại',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );
  }

  delPromotion(promotionId: string) {
    swal({
      title: 'Bạn muốn xóa chương trình khuyến mãi này',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.value) {
        this.promotionService.deletePromotion(promotionId, null).subscribe(
          data => {
            if (data.status) {
              swal(
                'Deleted!',
                'Chương trình khuyến mãi đã được xóa',
                'success'
              );
              this.router.navigate(['/promotion/']);
            }
          }
        );
      }
    });
  }
}
