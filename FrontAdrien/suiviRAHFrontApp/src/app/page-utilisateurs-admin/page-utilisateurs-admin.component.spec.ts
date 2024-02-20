import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUtilisateursAdminComponent } from './page-utilisateurs-admin.component';

describe('PageUtilisateursAdminComponent', () => {
  let component: PageUtilisateursAdminComponent;
  let fixture: ComponentFixture<PageUtilisateursAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageUtilisateursAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageUtilisateursAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
