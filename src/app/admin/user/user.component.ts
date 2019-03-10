import { Component, OnInit } from '@angular/core';
import { User } from '../../api/models';
import { Rule } from 'src/app/api/models/rule';

import { UserService } from 'src/app/services/user.service';
import { PermissionService } from 'src/app/services/permission.service';
import { CustomService } from 'src/app/services/custom.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: User[] = [];
  public usersDisplay: User[] = [];
  public rules: Rule[] = [];
  public ruleId = '';
  public userId = '';
  public userType = '';
  public listTypeUsers: Array<any>;
  public isLoading: Boolean = false;
  public keywordUsers = '';
  public statusSort: Boolean = true;
  public offset = 0;
  public limit = 20;
  scrollDistance = 1;
  scrollUpDistance = 2;
  throttle = 300;

  constructor(
    private userService: UserService,
    private permissionService: PermissionService,
    private customService: CustomService
  ) {
    this.listTypeUsers = this.customService.typeUser;
  }

  ngOnInit() {
    this.getListUsers(this.limit, this.offset);
    this.getListRules();
  }

  getListRules() {
    this.rules = [];
    this.permissionService.getPermissions().subscribe(
      data => {
        this.rules = data.rules;
        if (this.rules) {
          this.ruleId = this.rules[0].id;
        }
    });
  }

  getListUsers(limit: number, offset: number) {
    this.userService.getUsers(limit, offset).subscribe(data => {
      this.users = data;
      this.usersDisplay = this.users;
    });
  }

  onScrollDown(ev: any) {
    this.offset = this.offset + this.limit;
    this.getListUsersScroll(this.limit, this.offset);
  }

  getListUsersScroll(limit: number, offset: number) {
    this.userService.getUsers(limit, offset).subscribe(data => {
      if (data.hasOwnProperty('error')) {
      } else {
        this.users = this.users.concat(data);
        this.usersDisplay = this.users;
      }
    });
  }

  chooseUserShowPermission(userId: string, ruleId: string, userType: string) {
    this.userId = userId;
    this.ruleId = ruleId;
    this.userType = userType;
  }

  editPermissionToUser() {
    if (this.permissionService.checkParamChangePermission(this.userId, this.ruleId, this.userType) === false) {
      this.isLoading = false;
      return false;
    }

    this.permissionService.patchPermission({
      user_id: this.userId,
      rule_id: this.ruleId,
      user_type: this.userType
    }).subscribe(
      data => {
        if (data.status) {
          swal({
            type: 'success',
            title: 'Phân quyền thành công',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            this.getListUsers(9999, 0);
            this.isLoading = false;
          });
        } else {
          this.isLoading = false;
          swal({
            type: 'error',
            title: 'Phân quyền thất bại',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );
  }

  searchUserByKeyWord() {
    const params: Array<string> = ['id', 'username', 'fullname'];
    this.usersDisplay = this.customService.searchData(this.users, this.keywordUsers, params);
  }

  sortTableByBranch(param: string) {
    let condition: string;
    if (this.statusSort === true) {
      condition = 'asc';
      this.statusSort = false;
    } else {
      condition = 'desc';
      this.statusSort = true;
    }
    this.usersDisplay.sort(this.customService.compareValuesSort(param, condition));
  }

  sortTableByNumber(param: string) {
    let condition: string;
    if (this.statusSort === true) {
      condition = 'asc';
      this.statusSort = false;
    } else {
      condition = 'desc';
      this.statusSort = true;
    }
    this.usersDisplay.sort(this.customService.compareValuesNumberSort(param, condition));
  }
}
