import { WebsiteComponent } from './website/website.component';
import { StaticPageComponent } from './static-page/static-page.component';
import { SettingComponent } from './setting/setting.component';
import { PolicyComponent } from './policy/policy.component';
import { CensorshipComponent } from './censorship/censorship.component';
import { ActivateComponent } from './activate/activate.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponent } from './config.component';
import { SharesModule } from '../../shares/shares.module';
import { ExcelComponent } from './excel/excel.component';
import { IntegratedComponent } from './integrated/integrated.component';

@NgModule({
  imports: [
    CommonModule,
    SharesModule
  ],
  declarations: [
    ConfigComponent,
    ActivateComponent,
    CensorshipComponent,
    ExcelComponent,
    IntegratedComponent,
    PolicyComponent,
    SettingComponent,
    StaticPageComponent,
    WebsiteComponent
  ]
})
export class ConfigModule { }
