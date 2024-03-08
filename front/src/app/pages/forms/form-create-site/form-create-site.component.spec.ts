import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCreateSiteComponent } from './form-create-site.component';

describe('FormCreateSiteComponent', () => {
  let component: FormCreateSiteComponent;
  let fixture: ComponentFixture<FormCreateSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCreateSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCreateSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
