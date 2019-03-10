import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopService } from './services/shop.service';
import { ApiService } from './api/services';
import { CustomService } from './services/custom.service';
import { PermissionService } from './services/permission.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private token;
  constructor(
    private router: Router,
    private api: ApiService,
    private customService: CustomService,
    private permissionService: PermissionService
  ) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {   
      
    let token = localStorage.getItem('token');
    if (token) {
      let checkPermission = next.data.permission;
      if (checkPermission) {
        const user = JSON.parse(localStorage.getItem('usercurrent'));
        let rule_id = user.rule_id;
        switch (rule_id) {
          case '1':
            return true;
            break;
          case '2':
            return true;  
            break;
          default:
            
            break;
        }

        let path = next.data.path;
        let method = next.data.method;
        return new Promise((resolve, reject) => {
          this.permissionService.checkPermission(Number(rule_id), path, method).subscribe(data => {
            if (data.status) {
              resolve(true);
            } else {
              swal(
                'Warning!',
                'Bạn không có quyền xem nội dung này',
                'warning'
              );
              this.router.navigate(['/404']);
              resolve(false);
            }
          });
        });
      } else {
        return true;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  
}
