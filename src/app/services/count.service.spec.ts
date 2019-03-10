/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CountService } from './count.service';

describe('Service: Count', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountService]
    });
  });

  it('should ...', inject([CountService], (service: CountService) => {
    expect(service).toBeTruthy();
  }));
});
