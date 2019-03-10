import { RedeemDetailComponent } from './redeem-detail/redeem-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedeemComponent } from './redeem.component';
import { SharesModule } from '../../shares/shares.module';

@NgModule({
  imports: [
    CommonModule,
    SharesModule
  ],
  declarations: [
    RedeemComponent,
    RedeemDetailComponent
  ]
})
export class RedeemModule { }
