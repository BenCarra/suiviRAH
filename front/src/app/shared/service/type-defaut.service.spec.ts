import { TestBed } from '@angular/core/testing';

import { TypeDefautService } from './type-defaut.service';

describe('TypeDefautService', () => {
  let service: TypeDefautService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeDefautService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
