import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { SharesModule } from '../../shares/shares.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    SharesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBwS2BW9rvupGMVdBwm-dyIf6DRRYTnpZ4' //Google API key for maps
    })
  ],
  declarations: [
    ProfileComponent,
    UpdateProfileComponent
  ]
})
export class ProfileModule { }
