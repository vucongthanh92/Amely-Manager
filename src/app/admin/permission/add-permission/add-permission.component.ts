import { Component, OnInit } from '@angular/core';
import { RequestPostPermission } from 'src/app/api/models/request-post-permission';
import { Permission } from 'src/app/api/models/permission';
import { PermissionService } from 'src/app/services/permission.service';
import { CustomService } from 'src/app/services/custom.service';

import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.css']
})
export class AddPermissionComponent implements OnInit {
  public requestPermission: RequestPostPermission;
  public listPermissions: Permission[] = [];
  public typePermissions: Array<string>;
  public currentPermission: Array<any> = [];
  public checkedValue: Boolean = false;

  constructor(
    private permissionService: PermissionService,
    private customService: CustomService,
    private router: Router
  ) {
    this.requestPermission = this.permissionService.newObjectPermission(this.requestPermission);
    this.typePermissions = this.customService.typePermissions;
  }

  ngOnInit() {
    this.permissionService.getPermissions().subscribe(
      data => {
        this.listPermissions = data.permissions;
        this.currentPermission = this.listPermissions.map(
          permission => {
            return ['0', '0', '0', '0', '0'];
          }
        );
    });
  }

  choosePermission(e: any, i: number, j: number) {
    let value: string;
    if (e.checked) {
      value = '1';
    } else {
      value = '0';
    }
    this.currentPermission.map(
      (permission, index) => {
        if (index === i) {
          permission[j] = value;
        }
      }
    );
  }

  sendRequestPermission() {
    let result: any;
    result = this.permissionService.checkRequestPermission(
      this.requestPermission,
      this.listPermissions,
      this.currentPermission,
      this.checkedValue
    );

    if (!result.error) {
      this.permissionService.addPermission(this.requestPermission).subscribe(
        data => {
          if (data.status) {
            swal({
              type: 'success',
              title: 'Tạo Permission thành công',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/admin/permission']);
            });
          } else {
            swal({
              type: 'error',
              title: 'Tạo Permission thất bại',
              showConfirmButton: false,
              timer: 1500
            });
          }
        }
      );
    }
  }
}
