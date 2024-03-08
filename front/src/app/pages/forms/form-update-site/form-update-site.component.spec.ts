import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateSiteComponent } from './form-update-site.component';

describe('FormUpdateSiteComponent', () => {
  let component: FormUpdateSiteComponent;
  let fixture: ComponentFixture<FormUpdateSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormUpdateSiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormUpdateSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
