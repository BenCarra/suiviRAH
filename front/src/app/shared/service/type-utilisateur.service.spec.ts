import { TestBed } from '@angular/core/testing';

import { TypeUtilisateurService } from './type-utilisateur.service';

describe('TypeUtilisateurService', () => {
  let service: TypeUtilisateurService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeUtilisateurService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
