import { Injectable } from '@angular/core';
import { ApiService } from '../api/services';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

constructor(private api: ApiService) { }

  getProfile() {
   return this.api.getProfile();
  }
}
