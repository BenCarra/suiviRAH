import { TestBed } from '@angular/core/testing';

import { RDSService } from './rds.service';

describe('RDSService', () => {
  let service: RDSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RDSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
