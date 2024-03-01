import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateEquipeComponent } from './form-update-equipe.component';

describe('FormUpdateEquipeComponent', () => {
  let component: FormUpdateEquipeComponent;
  let fixture: ComponentFixture<FormUpdateEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateEquipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
