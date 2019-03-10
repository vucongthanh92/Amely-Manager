import { ProfileService } from './../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../api/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profile: User;
  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.profileService.getProfile().subscribe(data => {
      this.profile = data;
    });
  }

}
