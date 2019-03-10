import { ApiService } from 'src/app/api/services/api.service';
import { Injectable } from '@angular/core';
import { RequestPostPermission } from 'src/app/api/models/request-post-permission';
import { Permission } from 'src/app/api/models/permission';
import { RequestUpdatePermission } from 'src/app/api/models/request-update-permission';
import swal from 'sweetalert2';
import { RequestPostServices } from '../api/models/request-post-services';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private api: ApiService) {
  }

  getPermission(id: string) {
    return this.api.getPermission(id);
  }

  getPermissions() {
    return this.api.getPermissions();
  }

  addPermission(requestPostPermission: RequestPostPermission) {
    return this.api.addPermission(requestPostPermission);
  }

  patchPermission(requestUpdatePermission: RequestUpdatePermission) {
    return this.api.updatePermission(requestUpdatePermission);
  }

  deletePermission(id: string) {
    return this.api.deletePermission(id);
  }

  newObjectPermission(permissions: RequestPostPermission) {
    permissions = new RequestPostPermission();
    permissions.title = '';
    permissions.status = '0';
    permissions.permissions = [];
    return permissions;
  }

  checkPermissionInRule(permission: any) {
    const data: Array<string> = [];
    data.push(permission.get);
    data.push(permission.post);
    data.push(permission.put);
    data.push(permission.patch);
    data.push(permission.delete);
    return data;
  }

  checkRequestPermission(
    requestPermission: RequestPostPermission,
    listPermissions: Permission[] = [],
    currentPermission: Array<any> = [],
    checkedValue: Boolean
  ) {
    let error: Boolean = false;
    if ((!requestPermission.title) || (requestPermission.title === '')) {
      swal({
        type: 'error',
        title: 'Bạn chưa nhập tên cho Permission',
        showConfirmButton: false,
        timer: 1500
      });
      error = true;
    }
    if (checkedValue) {
      requestPermission.status = '1';
    } else {
      requestPermission.status = '0';
    }
    requestPermission.permissions = [];
    currentPermission.map(
      (permission, index) => {
        let checked = false;
        permission.map(
          data => {
            if (data === '1') {
              checked = true;
            }
          }
        );
        if (checked) {
          let value: String = '';
          value = listPermissions[index].id + ',' + permission.join(',');
          requestPermission.permissions.push(value.toString());
        }
      }
    );
    return {
      error: error,
      requestPermission: requestPermission
    };
  }

  checkParamChangePermission(userId: string, ruleId: string, userType: string) {
    if ((!userId) || (userId === '')) {
      swal({
        type: 'error',
        title: 'Bạn chưa chọn user!',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    if ((!ruleId) || (ruleId === '')) {
      swal({
        type: 'error',
        title: 'Bạn chưa chọn quyền!',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
    if ((!userType) || (userType === '')) {
      swal({
        type: 'error',
        title: 'Lỗi loại user!',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }
  }

  checkPermission(rule_id: number, path: string, method: string) {
    const requestPostServices = new RequestPostServices();
    requestPostServices.rule_id = rule_id;
    requestPostServices.path = path;
    requestPostServices.method = method;
    return this.api.postServices(requestPostServices);
  }
}
