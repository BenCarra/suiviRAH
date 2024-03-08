import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateTypeTacheComponent } from './form-update-type-tache.component';

describe('FormUpdateTypeTacheComponent', () => {
  let component: FormUpdateTypeTacheComponent;
  let fixture: ComponentFixture<FormUpdateTypeTacheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateTypeTacheComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateTypeTacheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
