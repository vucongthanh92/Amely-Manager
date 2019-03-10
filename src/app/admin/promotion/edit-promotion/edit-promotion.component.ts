import { Component, OnInit } from '@angular/core';
import { RequestPostPromotion } from 'src/app/api/models/request-post-promotion';
import { Shop } from 'src/app/api/models/shop';
import { Product } from 'src/app/api/models/product';

import { PromotionService } from 'src/app/services/promotion.service';
import { ShopService } from 'src/app/services/shop.service';
import { CustomService } from 'src/app/services/custom.service';
import { ProductService } from 'src/app/services/product.service';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-promotion',
  templateUrl: './edit-promotion.component.html',
  styleUrls: ['./edit-promotion.component.css']
})
export class EditPromotionComponent implements OnInit {

  public requestPostPromotion: RequestPostPromotion;
  public shops: Shop[];
  public products: Product[] = [];
  public product: Product;

  public promotionItemType: string;
  public promotionItemPrice: number;
  public promotionItemPercent: number;

  public listStatus: Array<any>;
  public listItemType: Array<any>;
  public listTimeType: Array<any>;
  public indexItem: number;

  public beginDay: Date;
  public beginTime: Date;
  public endDay: Date;
  public endTime: Date;

  constructor(
    private promotionService: PromotionService,
    private shopService: ShopService,
    public customService: CustomService,
    private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) {
    this.shops = [];
    this.indexItem = 0;
    this.product = new Product;
    this.listStatus = this.customService.statusSelect;
    this.listItemType = this.customService.promotionItemType;
    this.listTimeType = this.customService.promotionTimeType;
    this.requestPostPromotion = new RequestPostPromotion;
  }

  ngOnInit() {
    swal({
      title: 'Vui lòng đợi...'
    });
    swal.showLoading();
    this.activeRoute.params.subscribe(params => {
      this.promotionService.getPromotion(params.id).subscribe(
        data => {
          swal.close();
          this.requestPostPromotion.promotion_id = data.id;
          this.requestPostPromotion.shop_id = data.owner_id;
          this.requestPostPromotion.title = data.title;
          this.requestPostPromotion.time_type = data.time_type;
          this.requestPostPromotion.status = data.status;

          this.requestPostPromotion.end_time = data.end_time;
          this.requestPostPromotion.start_time = data.start_time;
          this.beginTime = this.beginDay = this.promotionService.convertTimeStampToDate(data.start_time);
          this.endTime = this.endDay = this.promotionService.convertTimeStampToDate(data.end_time);

          this.requestPostPromotion.items = [];
          this.requestPostPromotion.items = data.items.map(
            (item) => {
              return {
                promotion_item_id: item.id,
                product_id: item.product_id,
                percent: Number(item.percent),
                price: Number(item.price),
              };
            }
          );

          if (this.customService.userCurrent.type === 'admin') {
            this.getListShops(0, 9999);
          } else {
            this.requestPostPromotion.shop_id = this.customService.userCurrent.shop.id;
            this.getListProducts();
          }
          this.getPriceOrPercent(this.indexItem);
        }
      );
    });
  }

  getListShops(offset: number, limit: number) {
    this.shopService.getShopsByLimitOffset(limit, offset).subscribe(
      data => {
        if (data.length) {
          this.shops = data;
          this.getListProducts();
        }
      }
    );
  }

  getProductByShop() {
    this.getListProducts();
  }

  getListProducts() {
    this.products = [];
    this.productService.getProducts2(
      Number(this.requestPostPromotion.shop_id), 0, 1, 1, 'all', '', 'true', 0, 9999
    ).subscribe(
      data => {
        if (data.hasOwnProperty('error')) {
        } else {
          this.products = data;
          this.changeIndexItem(this.indexItem);
        }
    });
  }

  chooseProduct(tempProduct: Product) {
    this.product = tempProduct;
    this.requestPostPromotion.items[this.indexItem].product_id = tempProduct.id;
  }

  addItemPromotion() {
    this.requestPostPromotion = this.promotionService.createItemPromotion(this.requestPostPromotion);
  }

  deleteItemPromotion(index: number) {
    swal({
      title: 'Bạn muốn xóa mục khuyến mãi này',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.value) {
        this.promotionService.deletePromotion(
          this.requestPostPromotion.promotion_id,
          this.requestPostPromotion.items[index].promotion_item_id
        ).subscribe(
          data => {
            if (data.status) {
              swal(
                'Deleted!',
                'Mục khuyến mãi đã được xóa',
                'success'
              );
              this.requestPostPromotion.items.splice(index, 1);
            }
          }
        );
      }
    });
  }

  changeIndexItem(value: number) {
    this.product = new Product;
    this.indexItem = value;
    const productId: string = this.requestPostPromotion.items[value].product_id;
    this.products.filter(
      data => {
        if (data.id === productId) {
          this.product = data;
        }
      }
    );
    this.getPriceOrPercent(this.indexItem);
  }

  getPriceOrPercent(index: number) {
    this.promotionItemPrice = this.requestPostPromotion.items[index].price;
    this.promotionItemPercent = this.requestPostPromotion.items[index].percent;
    if ((!this.promotionItemPercent) || (this.promotionItemPercent === null)) {
      this.promotionItemType = '0';
    } else {
      this.promotionItemType = '1';
    }
  }

  changeValuePromotionItem(value: string) {
    if (value === 'price') {
      this.requestPostPromotion.items[this.indexItem].price = this.promotionItemPrice;
      this.requestPostPromotion.items[this.indexItem].percent = null;
    } else {
      this.requestPostPromotion.items[this.indexItem].price = null;
      this.requestPostPromotion.items[this.indexItem].percent = this.promotionItemPercent;
    }
  }

  updatePromotion() {
    this.requestPostPromotion.start_time = this.promotionService.convertTimePromotion(this.beginDay, this.beginTime);
    this.requestPostPromotion.end_time = this.promotionService.convertTimePromotion(this.endDay, this.endTime);
    // if (this.promotionService.checkParamPromotion(this.requestPostPromotion) === false) {
    //   return false;
    // }

    if (this.promotionService.checkPromotionTime(this.beginTime, this.endTime, this.requestPostPromotion.time_type) === false) {
      swal({
        type: 'error',
        title: 'Giờ bắt đầu không được nhỏ hơn giờ kết thúc',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    this.promotionService.requestPostPromotion(this.requestPostPromotion).subscribe(
      data => {
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
}
