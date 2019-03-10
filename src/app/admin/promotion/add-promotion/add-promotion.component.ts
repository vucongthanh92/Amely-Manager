import { Component, OnInit } from '@angular/core';
import { RequestPostPromotion } from 'src/app/api/models/request-post-promotion';
import { Shop } from 'src/app/api/models/shop';
import { Product } from 'src/app/api/models/product';

import { PromotionService } from 'src/app/services/promotion.service';
import { ShopService } from 'src/app/services/shop.service';
import { CustomService } from 'src/app/services/custom.service';
import { ProductService } from 'src/app/services/product.service';

import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.css']
})

export class AddPromotionComponent implements OnInit {
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

  public beginDay: Date = new Date();
  public beginTime: Date = new Date();
  public endDay: Date = new Date();
  public endTime: Date = new Date();

  constructor(
    private promotionService: PromotionService,
    private shopService: ShopService,
    public customService: CustomService,
    private productService: ProductService,
    private router: Router,
  ) {
    this.shops = [];
    this.indexItem = 0;
    this.product = new Product;
    this.listStatus = this.customService.statusSelect;
    this.listItemType = this.customService.promotionItemType;
    this.listTimeType = this.customService.promotionTimeType;
    this.requestPostPromotion = this.promotionService.createNewObjectPromotion(this.requestPostPromotion);
  }

  ngOnInit() {
    if (this.customService.userCurrent.type === 'admin') {
      this.getListShops(0, 9999);
    } else {
      this.requestPostPromotion.shop_id = this.customService.userCurrent.shop.id;
      this.getListProducts();
    }
    this.getPriceOrPercent(this.indexItem);
  }

  getListShops(offset: number, limit: number) {
    this.shopService.getShopsByLimitOffset(limit, offset).subscribe(
      data => {
        if (data.length) {
          this.shops = data;
          this.requestPostPromotion.shop_id = this.shops[0].id;
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
          this.products = data.filter(
            productTemp => {
              if ((Number(productTemp.sale_price) === 0) && (Number(productTemp.quantity) > 0)) {
                return productTemp;
              }
            }
          );
        }
    });
  }

  chooseProduct(tempProduct: Product) {
    this.product = tempProduct;
    this.requestPostPromotion.items[this.indexItem].product_id = tempProduct.id;
    this.requestPostPromotion.items[this.indexItem].product_price = Number(tempProduct.price);
  }

  addItemPromotion() {
    this.requestPostPromotion = this.promotionService.createItemPromotion(this.requestPostPromotion);
  }

  deleteItemPromotion(index: number) {
    this.requestPostPromotion.items.splice(index, 1);
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

  checkRequestPromotion() {
    if (this.promotionService.checkPromotionTime(this.beginTime, this.endTime, this.requestPostPromotion.time_type) === false) {
      swal({
        type: 'error',
        title: 'Giờ bắt đầu không được nhỏ hơn giờ kết thúc',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    } else {
      this.requestPostPromotion.start_time = this.promotionService.convertTimePromotion(this.beginDay, this.beginTime);
      this.requestPostPromotion.end_time = this.promotionService.convertTimePromotion(this.endDay, this.endTime);
      this.promotionService.checkParamPromotion(this.requestPostPromotion).then(
        data => {
          if (data === true) {
            this.createPromotion();
          }
        }
      );
    }
  }

  private createPromotion() {
    this.promotionService.requestPostPromotion(this.requestPostPromotion).subscribe(
      data => {
        if (data.status) {
          swal({
            type: 'success',
            title: 'Tạo chương trình khuyến mãi thành công',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.router.navigate(['/promotion']);
          });
        } else {
          swal({
            type: 'error',
            title: 'Tạo chương trình khuyến mãi thất bại',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );
  }
}
