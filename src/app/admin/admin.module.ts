import { PermissionModule } from './permission/permission.module';
import { ProductGroupModule } from './product-group/product-group.module';
import { ConfigModule } from './config/config.module';
import { SystemModule } from './system/system.module';
import { UserModule } from './user/user.module';
import { FinanceModule } from './finance/finance.module';
import { ProfileComponent } from './profile/profile.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharesModule } from '../shares/shares.module';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { PromotionModule } from './promotion/promotion.module';
import { AdvertiseModule } from './advertise/advertise.module';
import { OrdersModule } from './orders/orders.module';
import { DeliveryModule } from './delivery/delivery.module';
import { RedeemModule } from './redeem/redeem.module';
import { CategoryModule } from './category/category.module';
import { StoresModule } from './stores/stores.module';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  imports: [
    SharesModule,
    CommonModule,
    AdminRoutingModule,
    ProductModule,
    ShopModule,
    PromotionModule,
    AdvertiseModule,
    OrdersModule,
    DeliveryModule,
    RedeemModule,
    FinanceModule,
    CategoryModule,
    UserModule,
    SystemModule,
    ConfigModule,
    StoresModule,
    ProductGroupModule,
    InfiniteScrollModule,
    PermissionModule
  ],
  declarations: [
    DashboardComponent,
    ProgressbarComponent,
  ],
  exports: [
    InfiniteScrollModule
  ]
})
export class AdminModule { }
