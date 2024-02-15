import { TestBed } from '@angular/core/testing';

import { RehberService } from './rehber.service';

describe('RehberService', () => {
  let service: RehberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RehberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
