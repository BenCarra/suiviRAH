import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateClientComponent } from './form-create-client.component';

describe('FormCreateClientComponent', () => {
  let component: FormCreateClientComponent;
  let fixture: ComponentFixture<FormCreateClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateClientComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormCreateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
