import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AdminModule } from './admin/admin.module';
import { SharesModule } from './shares/shares.module';
import { LayoutsModule } from './layouts/layouts.module';
import { TranslateService } from './translate.service';
import { TranslatePipe } from './translate.pipe';
import { FormsModule } from '@angular/forms';
import { ProfileModule } from './admin/profile/profile.module';
import { ApiModule } from './api/api.module';
import { AuthGuard } from './auth.guard';
import { AuthenticationInterceptor } from './authentication/authentication-interceptor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SlugifyPipe } from './slugify.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

export function setupTranslateFactory(
  service: TranslateService): Function {
  return () => service.use('vi');
}

@NgModule({
  declarations: [
    AppComponent,
    SlugifyPipe
  ],
  imports: [
    LayoutsModule,
    SharesModule,
    AdminModule,
    AuthenticationModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    FormsModule,
    HttpClientModule,
    ProfileModule,
    ApiModule,
    InfiniteScrollModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  exports: [
    InfiniteScrollModule
  ],
  providers: [
    TranslateService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    {
      provide: APP_INITIALIZER,
      useFactory: setupTranslateFactory,
      deps: [ TranslateService ],
      multi: true
    },
    AuthGuard,
    SlugifyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
