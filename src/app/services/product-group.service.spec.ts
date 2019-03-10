/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductGroupService } from './product-group.service';

describe('Service: ProductGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductGroupService]
    });
  });

  it('should ...', inject([ProductGroupService], (service: ProductGroupService) => {
    expect(service).toBeTruthy();
  }));
});
