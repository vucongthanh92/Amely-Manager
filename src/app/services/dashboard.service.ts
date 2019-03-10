import { ApiService } from 'src/app/api/services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor(private api: ApiService) { }

  getDashboard(shopId: string) {
    return this.api.getDashboard(shopId);
  }
}
