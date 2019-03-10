import { SharesModule } from './../shares/shares.module';
import { HeaderComponent } from './../shares/header/header.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [
    SharesModule,
    RouterModule.forRoot(routes),
    CommonModule
  ],
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutsModule { }
