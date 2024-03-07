import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTypeUtilisateurComponent } from './form-create-type-utilisateur.component';

describe('FormCreateTypeUtilisateurComponent', () => {
  let component: FormCreateTypeUtilisateurComponent;
  let fixture: ComponentFixture<FormCreateTypeUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateTypeUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateTypeUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
