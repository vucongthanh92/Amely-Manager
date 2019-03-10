import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ProductGroupDetailComponent } from './product-group-detail/product-group-detail.component';
import { ProductGroupAddComponent } from './product-group-add/product-group-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGroupComponent } from './product-group.component';
import { SharesModule } from '../../shares/shares.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    EditorModule,
    InfiniteScrollModule
  ],
  declarations: [
    ProductGroupComponent,
    ProductGroupAddComponent,
    ProductGroupDetailComponent
  ]
})
export class ProductGroupModule { }
