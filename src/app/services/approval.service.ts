import { ApiService } from 'src/app/api/services/api.service';
import { Injectable } from '@angular/core';
import { requestEditApproval } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {

constructor(private api: ApiService) { }
  editApproval(subject_id: any, subject_type: any) {
    const reqApproval = new requestEditApproval();
      reqApproval.subject_id = subject_id;
      reqApproval.subject_type = subject_type;
    return this.api.editApproval(reqApproval);
  }
}
