/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApprovalService } from './approval.service';

describe('Service: Approval', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApprovalService]
    });
  });

  it('should ...', inject([ApprovalService], (service: ApprovalService) => {
    expect(service).toBeTruthy();
  }));
});
