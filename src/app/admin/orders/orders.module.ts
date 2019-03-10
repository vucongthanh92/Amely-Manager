import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { SharesModule } from '../../shares/shares.module';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    InfiniteScrollModule
  ],
  declarations: [
    OrdersComponent,
    DetailOrderComponent
  ]
})
export class OrdersModule { }
