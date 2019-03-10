import { SharesModule } from 'src/app/shares/shares.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MallComponent } from './mall.component';

@NgModule({
  imports: [
    CommonModule,
    SharesModule
  ],
  declarations: [MallComponent]
})
export class MallModule { }
