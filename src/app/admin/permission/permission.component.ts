import { Component, OnInit } from '@angular/core';
import { PermissionService } from 'src/app/services/permission.service';
import { Rule } from 'src/app/api/models/rule';

import swal from 'sweetalert2';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  public rules: Rule[] = [];
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;

  constructor(
    private permissionService: PermissionService
  ) { }

  ngOnInit() {
    this.getListRules();
  }

  getListRules() {
    this.rules = [];
    this.permissionService.getPermissions().subscribe(
      data => {
        this.rules = data.rules;
    });
  }

  deletePermission(id: string) {
    swal({
      title: 'Bạn muốn xóa Rule này',
      text: '',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.value) {
        this.permissionService.deletePermission(id).subscribe(
          data => {
            if (data.status) {
              swal(
                'Deleted!',
                'Rule đã được xóa',
                'success'
              );
              this.getListRules();
            }
          }
        );
      }
    });
  }
}
