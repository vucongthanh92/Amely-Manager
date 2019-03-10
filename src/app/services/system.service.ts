import { ApiService } from 'src/app/api/services/api.service';
import { Injectable } from '@angular/core';
import { RequestAddSystem } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

constructor(private api: ApiService) { }

  getSystem() {
    return this.api.getSystem();
  }

  addSystem(title, name, value) {
    const request = new RequestAddSystem;
    request.title = title;
    request.name = name;
    request.value = value;
    return this.api.editSystem(request);
  }

  updateSystem(id, title, name, value) {
    const request = new RequestAddSystem;
    request.id = id;
    request.title = title;
    request.name = name;
    request.value = value;
    return this.api.editSystem(request);
  }
}
