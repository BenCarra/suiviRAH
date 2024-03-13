import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSuivisProjetAdminComponent } from './page-suivis-projet-admin.component';

describe('PageSuivisProjetAdminComponent', () => {
  let component: PageSuivisProjetAdminComponent;
  let fixture: ComponentFixture<PageSuivisProjetAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSuivisProjetAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageSuivisProjetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
