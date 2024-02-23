import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateTacheComponent } from './form-create-tache.component';

describe('FormCreateTacheComponent', () => {
  let component: FormCreateTacheComponent;
  let fixture: ComponentFixture<FormCreateTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateTacheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
