import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateTypeProjetComponent } from './form-update-type-projet.component';

describe('FormUpdateTypeProjetComponent', () => {
  let component: FormUpdateTypeProjetComponent;
  let fixture: ComponentFixture<FormUpdateTypeProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateTypeProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateTypeProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
