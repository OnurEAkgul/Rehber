import { TestBed } from '@angular/core/testing';

import { coreServices } from './core-services.service';

describe('coreServices', () => {
  let service: coreServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(coreServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
