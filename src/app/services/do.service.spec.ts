/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DoService } from './do.service';

describe('Service: Do', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DoService]
    });
  });

  it('should ...', inject([DoService], (service: DoService) => {
    expect(service).toBeTruthy();
  }));
});
