import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateRdsComponent } from './form-create-rds.component';

describe('FormCreateRdsComponent', () => {
  let component: FormCreateRdsComponent;
  let fixture: ComponentFixture<FormCreateRdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateRdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateRdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
