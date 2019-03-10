import { AddPromotionComponent } from './add-promotion/add-promotion.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionComponent } from './promotion.component';
import { SharesModule } from '../../shares/shares.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DetailPromotionComponent } from './detail-promotion/detail-promotion.component';
import { EditPromotionComponent } from './edit-promotion/edit-promotion.component';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    NgSelectModule,
    FormsModule,
    EditorModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
  ],
  declarations: [
    PromotionComponent,
    AddPromotionComponent,
    DetailPromotionComponent,
    EditPromotionComponent
  ]
})
export class PromotionModule { }
