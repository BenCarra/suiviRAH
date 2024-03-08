import { TestBed } from '@angular/core/testing';

import { TypeProjetService } from './type-projet.service';

describe('TypeProjetService', () => {
  let service: TypeProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
