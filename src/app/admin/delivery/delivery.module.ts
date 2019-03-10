import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DetailDeliveryComponent } from './detail-delivery/detail-delivery.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryComponent } from './delivery.component';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from '../../layouts/admin-layout/admin-layout.component';
import { SharesModule } from '../../shares/shares.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    InfiniteScrollModule,
    FormsModule,
  ],
  declarations: [
    DeliveryComponent,
    DetailDeliveryComponent
  ]
})
export class DeliveryModule { }
