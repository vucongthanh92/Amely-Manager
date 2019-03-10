import { CustomService } from './../../../services/custom.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserService } from '../../../services/user.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as moment from 'moment';
@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  @ViewChild('emailPattern') emailPattern;
  @ViewChild('phonePattern') phonePattern;
  public username: any;
  public first_name = '';
  public last_name = '';
  public email = '';
  public password = '';
  public birthday = '';
  public gender = 'male';
  public mobile_login = '';
  public isLoading: Boolean = false;
  constructor(private userService: UserService, private router: Router, public customService: CustomService) { }

  ngOnInit() {
  }

  onSelectGender(value: string) {
    this.gender = value;
  }

  createUser() {
    if (!this.username) {
      swal({
        type: 'warning',
        title: 'Tên đăng nhập không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (!this.first_name) {
      swal({
        type: 'warning',
        title: 'Họ không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (!this.last_name) {
      swal({
        type: 'warning',
        title: 'Tên không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (!this.email) {
      swal({
        type: 'warning',
        title: 'Email không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (this.emailPattern.errors) {
      swal({
        type: 'warning',
        title: 'Email không đúng định dạng !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (!this.password) {
      swal({
        type: 'warning',
        title: 'Mật khẩu không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (!this.birthday) {
      swal({
        type: 'warning',
        title: 'Ngày sinh không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (!this.gender) {
      swal({
        type: 'warning',
        title: 'Giới tính không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    } else if (!this.mobile_login) {
      swal({
        type: 'warning',
        title: 'Số điện thoại không được để trống !',
        showConfirmButton: false,
        timer: 2000
      });
    }  else if (this.phonePattern.errors) {
      swal({
        type: 'warning',
        title: 'Số điện thoại không đúng định dạng !',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      const beginDay = new Date(this.birthday);
      this.birthday = moment(beginDay, 'Asia/Ho_Chi_Minh').format('YYYY-MM-DD');
      // tslint:disable-next-line:max-line-length
      this.userService.createUser(this.username, this.first_name, this.last_name, this.email, this.password, this.birthday, this.gender, this.mobile_login).subscribe(data => {
        if (data.status) {
          this.isLoading = true;
          swal({
            type: 'success',
            title: 'Tạo người dùng thành công',
            showConfirmButton: false,
            timer: 2000
          }).then(() => {
            this.router.navigate(['/admin/user']);
          });
        } else if (data.error === 'email_exist') {
          this.isLoading = false;
          swal({
            type: 'error',
            title: 'Email đã tồn tại !',
            showConfirmButton: false,
            timer: 2000
          });
        } else if (data.error === 'mobile_exist') {
          this.isLoading = false;
          swal({
            type: 'error',
            title: 'Số điện thoại đã tồn tại !',
            showConfirmButton: false,
            timer: 2000
          });
        }
     });
    }
  }
}
