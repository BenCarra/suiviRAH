import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTypeProjetComponent } from './form-create-type-projet.component';

describe('FormCreateTypeProjetComponent', () => {
  let component: FormCreateTypeProjetComponent;
  let fixture: ComponentFixture<FormCreateTypeProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateTypeProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateTypeProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
