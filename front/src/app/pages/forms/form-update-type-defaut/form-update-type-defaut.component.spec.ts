import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateTypeDefautComponent } from './form-update-type-defaut.component';

describe('FormUpdateTypeDefautComponent', () => {
  let component: FormUpdateTypeDefautComponent;
  let fixture: ComponentFixture<FormUpdateTypeDefautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateTypeDefautComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateTypeDefautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
