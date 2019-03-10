import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../api/models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  public user = new User;
  constructor(private route: ActivatedRoute,  private userService: UserService) {
   }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userService.getUser(params.username).subscribe(data => {
        this.user = data;
      });
    });
  }
}
