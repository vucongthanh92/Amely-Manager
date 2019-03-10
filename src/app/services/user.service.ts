import { RequestCreateUser } from './../api/models/request-create-user';
import { ApiService } from 'src/app/api/services/api.service';
import { Injectable } from '@angular/core';
import { RequestGetUsers } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }

  getUsers(limit, offset) {
    const requestUser = new RequestGetUsers;
    requestUser.limit = limit;
    requestUser.offset = offset;
    return this.api.getUsers(requestUser);
  }

  getUser(username: string) {
    return this.api.getUser(username);
  }

  createUser(username, first_name, last_name, email, password, birthdate, gender, mobilelogin) {
    const request = new RequestCreateUser;
    request.username = username;
    request.first_name = first_name;
    request.last_name = last_name;
    request.email = email;
    request.password = password;
    request.birthdate = birthdate;
    request.gender = gender;
    request.mobilelogin = mobilelogin;
    return this.api.createUser(request);
  }

}
