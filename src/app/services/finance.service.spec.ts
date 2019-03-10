/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FinanceService } from './finance.service';

describe('Service: Finance', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FinanceService]
    });
  });

  it('should ...', inject([FinanceService], (service: FinanceService) => {
    expect(service).toBeTruthy();
  }));
});
