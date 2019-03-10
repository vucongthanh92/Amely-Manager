import { MatCheckboxModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { SharesModule } from 'src/app/shares/shares.module';
import { FormsModule } from '@angular/forms';
import { DetailCategoryComponent } from './detail-category/detail-category.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    EditorModule,
    NgSelectModule,
    InfiniteScrollModule,
    LaddaModule.forRoot({
      style: 'expand-right',
      spinnerSize: 40,
      spinnerColor: 'LightGray',
      spinnerLines: 12
    }),
    MatCheckboxModule
  ],
  exports: [
    InfiniteScrollModule
  ],
  declarations: [CategoryComponent, AddCategoryComponent, EditCategoryComponent, DetailCategoryComponent]
})
export class CategoryModule { }
