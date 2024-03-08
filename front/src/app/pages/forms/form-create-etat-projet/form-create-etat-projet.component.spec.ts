import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateEtatProjetComponent } from './form-create-etat-projet.component';

describe('FormCreateEtatProjetComponent', () => {
  let component: FormCreateEtatProjetComponent;
  let fixture: ComponentFixture<FormCreateEtatProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateEtatProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateEtatProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
