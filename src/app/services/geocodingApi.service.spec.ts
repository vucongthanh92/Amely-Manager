/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GeocodingApiService } from './geocodingApi.service';

describe('Service: GeocodingApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeocodingApiService]
    });
  });

  it('should ...', inject([GeocodingApiService], (service: GeocodingApiService) => {
    expect(service).toBeTruthy();
  }));
});
