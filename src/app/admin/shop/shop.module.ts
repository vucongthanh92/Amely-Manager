import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatCheckboxModule } from '@angular/material';
import { UpdateShopComponent } from './update-shop/update-shop.component';
import { DetailShopComponent } from './detail-shop/detail-shop.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SharesModule } from '../../shares/shares.module';
import { AddShopComponent } from './add-shop/add-shop.component';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { LaddaModule } from 'angular2-ladda';



@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBwS2BW9rvupGMVdBwm-dyIf6DRRYTnpZ4' // Google API key for maps
    }),
    EditorModule,
    MatCheckboxModule,
    NgSelectModule,
    LaddaModule.forRoot({
      style: 'expand-right',
      spinnerSize: 40,
      spinnerColor: 'LightGray',
      spinnerLines: 12
    }),
    InfiniteScrollModule
  ],
  declarations: [
    ShopComponent,
    AddShopComponent,
    DetailShopComponent,
    UpdateShopComponent
  ]
})

export class ShopModule { }
