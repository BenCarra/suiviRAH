import { TestBed } from '@angular/core/testing';

import { TypeTacheService } from './type-tache.service';

describe('TypeTacheService', () => {
  let service: TypeTacheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeTacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
