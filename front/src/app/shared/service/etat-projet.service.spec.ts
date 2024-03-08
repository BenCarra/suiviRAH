import { TestBed } from '@angular/core/testing';

import { EtatProjetService } from './etat-projet.service';

describe('EtatProjetService', () => {
  let service: EtatProjetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtatProjetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
