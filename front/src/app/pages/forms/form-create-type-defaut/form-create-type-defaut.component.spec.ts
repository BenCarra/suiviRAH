import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTypeDefautComponent } from './form-create-type-defaut.component';

describe('FormCreateTypeDefautComponent', () => {
  let component: FormCreateTypeDefautComponent;
  let fixture: ComponentFixture<FormCreateTypeDefautComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateTypeDefautComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateTypeDefautComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
