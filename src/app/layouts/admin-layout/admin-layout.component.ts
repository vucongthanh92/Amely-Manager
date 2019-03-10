import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api/services';
import { CustomService } from '../../services/custom.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  constructor(
    private api: ApiService,
    private customService: CustomService
  ) { }

  ngOnInit() {
    this.api.getProfile().subscribe(
      data => {
        this.customService.userCurrent = data;
    });
  }

}
