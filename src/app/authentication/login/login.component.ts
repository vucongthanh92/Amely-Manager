import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api/services';
import { CustomService } from '../../services/custom.service';
import swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  submitted = false;

  constructor(
    private router: Router,
    private api: ApiService,
    private customService: CustomService
  ) {
    this.customService.getPermission();
  }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('usercurrent');
  }

  onLogin() {
    if (!this.username) {
      swal({
        type: 'warning',
        text: 'Tên đăng nhập không được để trống !',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else if (!this.password) {
      swal({
        type: 'warning',
        text: 'Mật khẩu không được để trống !',
        showConfirmButton: false,
        confirmButtonColor: '#049F0C',
        confirmButtonText: 'Yes',
      });
    } else {
      swal({
        title: 'Vui lòng đợi...'
      });
      swal.showLoading();
      this.api.login({ username: this.username, password: this.password}).subscribe(
        resp => {
          swal.close();
          if (resp.token) {
            localStorage.setItem('token', resp.token);
            localStorage.setItem('username', this.username);
            this.api.getProfile().subscribe( data => {
              localStorage.setItem('usercurrent', JSON.stringify(data));
              this.customService.getProfile();
              localStorage.setItem('rule_id', data.rule_id);
              // tslint:disable-next-line:no-shadowed-variable
              this.router.navigate(['/dashboard']);
            });
            // this.api.getPermissions().subscribe( data => {
            //   localStorage.setItem('permission', JSON.stringify(data.permissions));
            // });
          } else {
            swal({
              type: 'warning',
              text: 'Đăng nhập thất bại !',
              showConfirmButton: false,
              confirmButtonColor: '#049F0C',
              confirmButtonText: 'Yes',
            });
            this.router.navigate(['/login']);
          }
      });
    }
  }

  onSubmit() {
    this.router.navigate(['/dashboard']);
  }
}
