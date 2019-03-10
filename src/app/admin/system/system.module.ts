import { FormsModule } from '@angular/forms';
import { SharesModule } from 'src/app/shares/shares.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    FormsModule
  ],
  declarations: [
    SystemComponent,
  ]
})
export class SystemModule { }
