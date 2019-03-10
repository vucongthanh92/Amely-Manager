import { HeadComponent } from './head/head.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslatePipe } from '../translate.pipe';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) ,
    CommonModule
  ],
  declarations: [
    HeadComponent,
    HeaderComponent,
    FooterComponent,
    TranslatePipe
  ],
  exports: [
    RouterModule,
    HeadComponent,
    HeaderComponent,
    FooterComponent,
    TranslatePipe
  ]
})
export class SharesModule { }
