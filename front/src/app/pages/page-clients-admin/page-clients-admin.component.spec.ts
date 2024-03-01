import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageClientsAdminComponent } from './page-clients-admin.component';

describe('PageClientsAdminComponent', () => {
  let component: PageClientsAdminComponent;
  let fixture: ComponentFixture<PageClientsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageClientsAdminComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageClientsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
