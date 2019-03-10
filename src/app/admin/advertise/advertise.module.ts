import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DetailAdvertiseComponent } from './detail-advertise/detail-advertise.component';
import { AddAdvertiseComponent } from './add-advertise/add-advertise.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertiseComponent } from './advertise.component';
import { SharesModule } from '../../shares/shares.module';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MatCheckboxModule } from '@angular/material';
import { LaddaModule } from 'angular2-ladda';


@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    EditorModule,
    InfiniteScrollModule,
    MatCheckboxModule,
    LaddaModule.forRoot({
      style: 'expand-right',
      spinnerSize: 40,
      spinnerColor: 'LightGray',
      spinnerLines: 12
    }),
  ],
  declarations: [
    AdvertiseComponent,
    AddAdvertiseComponent,
    DetailAdvertiseComponent
  ]
})
export class AdvertiseModule { }
