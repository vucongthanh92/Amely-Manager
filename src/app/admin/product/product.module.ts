import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule } from '@angular/router';
import { SharesModule } from 'src/app/shares/shares.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatCheckboxModule } from '@angular/material';
import { LaddaModule } from 'angular2-ladda';
import { ProductComponent } from './product.component';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    EditorModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TagInputModule,
    BrowserAnimationsModule,
    BrowserModule,
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
    AddProductComponent,
    ProductDetailComponent,
    UpdateProductComponent,
    ProductQuantityComponent,
    ProductComponent
  ]
})
export class ProductModule { }
