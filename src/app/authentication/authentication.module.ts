import { ForgotComponent } from './forgot/forgot.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './authentication-interceptor';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';
import { SharesModule } from '../shares/shares.module';

@NgModule({
  imports: [
    AuthenticationRoutingModule,
    CommonModule,
    FormsModule,
    SharesModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    Page404Component,
    ResultComponent
  ]
})
export class AuthenticationModule { }
