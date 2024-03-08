import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateEtatProjetComponent } from './form-update-etat-projet.component';

describe('FormUpdateEtatProjetComponent', () => {
  let component: FormUpdateEtatProjetComponent;
  let fixture: ComponentFixture<FormUpdateEtatProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateEtatProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateEtatProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
