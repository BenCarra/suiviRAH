import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateProjetComponent } from './form-create-projet.component';

describe('FormCreateProjetComponent', () => {
  let component: FormCreateProjetComponent;
  let fixture: ComponentFixture<FormCreateProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
