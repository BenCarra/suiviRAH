import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateEquipeComponent } from './form-create-equipe.component';

describe('FormCreateEquipeComponent', () => {
  let component: FormCreateEquipeComponent;
  let fixture: ComponentFixture<FormCreateEquipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateEquipeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormCreateEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
