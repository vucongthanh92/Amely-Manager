/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SystemService } from './system.service';

describe('Service: System', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemService]
    });
  });

  it('should ...', inject([SystemService], (service: SystemService) => {
    expect(service).toBeTruthy();
  }));
});
