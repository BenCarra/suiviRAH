import { TestBed } from '@angular/core/testing';

import { CompositionService } from './composition.service';

describe('CompositionService', () => {
  let service: CompositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
