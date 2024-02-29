import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateTacheComponent } from './form-update-tache.component';

describe('FormUpdateTacheComponent', () => {
  let component: FormUpdateTacheComponent;
  let fixture: ComponentFixture<FormUpdateTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateTacheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
