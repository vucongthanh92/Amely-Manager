/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RedeemService } from './redeem.service';

describe('Service: Redeem', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedeemService]
    });
  });

  it('should ...', inject([RedeemService], (service: RedeemService) => {
    expect(service).toBeTruthy();
  }));
});
