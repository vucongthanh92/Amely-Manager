/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SoService } from './so.service';

describe('Service: So', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SoService]
    });
  });

  it('should ...', inject([SoService], (service: SoService) => {
    expect(service).toBeTruthy();
  }));
});
