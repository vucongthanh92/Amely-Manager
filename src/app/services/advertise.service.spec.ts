/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdvertiseService } from './advertise.service';

describe('Service: Advertise', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertiseService]
    });
  });

  it('should ...', inject([AdvertiseService], (service: AdvertiseService) => {
    expect(service).toBeTruthy();
  }));
});
