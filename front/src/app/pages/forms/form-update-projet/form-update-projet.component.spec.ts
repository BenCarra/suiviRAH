import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateProjetComponent } from './form-update-projet.component';

describe('FormUpdateProjetComponent', () => {
  let component: FormUpdateProjetComponent;
  let fixture: ComponentFixture<FormUpdateProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
