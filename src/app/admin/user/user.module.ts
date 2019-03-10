import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { SharesModule } from '../../shares/shares.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserAddComponent } from './user-add/user-add.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { LaddaModule } from 'angular2-ladda';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    LaddaModule.forRoot({
      style: 'expand-right',
      spinnerSize: 40,
      spinnerColor: 'LightGray',
      spinnerLines: 12
    }),
    NgSelectModule,
    InfiniteScrollModule
  ],
  declarations: [
    UserComponent,
    UserDetailComponent,
    UserAddComponent
  ]
})
export class UserModule { }
