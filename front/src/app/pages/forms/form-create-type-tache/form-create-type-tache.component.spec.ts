import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTypeTacheComponent } from './form-create-type-tache.component';

describe('FormCreateTypeTacheComponent', () => {
  let component: FormCreateTypeTacheComponent;
  let fixture: ComponentFixture<FormCreateTypeTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateTypeTacheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateTypeTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
