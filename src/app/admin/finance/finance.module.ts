import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance.component';
import { SharesModule } from '../../shares/shares.module';
import { FinanceDetailComponent } from './finance-detail/finance-detail.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    FormsModule
  ],
  declarations: [
    FinanceComponent,
    FinanceDetailComponent
  ]
})
export class FinanceModule { }
