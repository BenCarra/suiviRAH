import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateRdsComponent } from './form-update-rds.component';

describe('FormUpdateRdsComponent', () => {
  let component: FormUpdateRdsComponent;
  let fixture: ComponentFixture<FormUpdateRdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateRdsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateRdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
