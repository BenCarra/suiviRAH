import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAccueilAdminComponent } from './page-accueil-admin.component';

describe('PageAccueilAdminComponent', () => {
  let component: PageAccueilAdminComponent;
  let fixture: ComponentFixture<PageAccueilAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAccueilAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageAccueilAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
