import { Component, OnInit } from '@angular/core';
import { Permission } from 'src/app/api/models/permission';
import { RequestPostPermission } from 'src/app/api/models/request-post-permission';

import { CustomService } from 'src/app/services/custom.service';
import { PermissionService } from 'src/app/services/permission.service';

import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.css']
})
export class EditPermissionComponent implements OnInit {
  public listPermissions: Permission[] = [];
  public typePermissions: Array<string>;
  public currentPermission: Array<any> = [];
  public checkedValue: Boolean = false;
  public requestPermission: RequestPostPermission;

  constructor(
    private permissionService: PermissionService,
    private customService: CustomService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.typePermissions = this.customService.typePermissions;
    this.requestPermission = this.permissionService.newObjectPermission(this.requestPermission);
  }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      this.permissionService.getPermission(params.id).subscribe(
        detailPermission => {
          this.requestPermission.rule_id = detailPermission.id;
          this.requestPermission.title = detailPermission.title;
          if (detailPermission.status === '1') {
            this.checkedValue = true;
          } else {
            this.checkedValue = false;
          }

          let permissionRule: Array<string> = [];
          permissionRule = detailPermission.permissions.map(
            data => {
              return data.permission_id;
            }
          );

          this.permissionService.getPermissions().subscribe(
            respAllPermissions => {
              this.listPermissions = respAllPermissions.permissions;
              this.currentPermission = this.listPermissions.map(
                (result) => {
                  let compareValue: Number;
                  compareValue = permissionRule.findIndex(permission => permission === result.id);
                  if ((detailPermission.permissions[compareValue.toString()]) && (compareValue !== -1)) {
                    let permissionTemp: Array<string> = [];
                    permissionTemp = this.permissionService.checkPermissionInRule(detailPermission.permissions[compareValue.toString()]);
                    return permissionTemp;
                  } else {
                    return ['0', '0', '0', '0', '0'];
                  }
                }
              );
            }
          );
        }
      );
    });
  }

  choosePermission(e: any, i: number = 0, j: number = 0) {
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
      this.requestPermission = result.requestPermission;
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
