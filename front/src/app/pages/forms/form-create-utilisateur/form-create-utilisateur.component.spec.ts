import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateUtilisateurComponent } from './form-create-utilisateur.component';

describe('FormCreateUtilisateurComponent', () => {
  let component: FormCreateUtilisateurComponent;
  let fixture: ComponentFixture<FormCreateUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateUtilisateurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
