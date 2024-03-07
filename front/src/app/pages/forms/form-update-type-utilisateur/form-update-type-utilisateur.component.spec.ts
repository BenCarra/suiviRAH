import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateTypeUtilisateurComponent } from './form-update-type-utilisateur.component';

describe('FormUpdateTypeUtilisateurComponent', () => {
  let component: FormUpdateTypeUtilisateurComponent;
  let fixture: ComponentFixture<FormUpdateTypeUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateTypeUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateTypeUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
