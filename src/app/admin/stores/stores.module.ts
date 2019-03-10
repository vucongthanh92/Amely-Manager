import { DetailStoreComponent } from './detail-store/detail-store.component';
import { AddStoreComponent } from './add-store/add-store.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresComponent } from './stores.component';
import { SharesModule } from '../../shares/shares.module';
import { UpdateStoreComponent } from './update-store/update-store.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3yB3rjuWEP0UpE-YGf-aKpSVosHyWz24' //Google API key for maps
    }),
    EditorModule,
    LaddaModule.forRoot({
      style: 'expand-right',
      spinnerSize: 40,
      spinnerColor: 'LightGray',
      spinnerLines: 12
    }),
  ],
  declarations: [
    StoresComponent,
    AddStoreComponent,
    DetailStoreComponent,
    UpdateStoreComponent
  ]
})
export class StoresModule { }
