import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageParametresAdminComponent } from './page-parametres-admin.component';

describe('PageParametresAdminComponent', () => {
  let component: PageParametresAdminComponent;
  let fixture: ComponentFixture<PageParametresAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageParametresAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageParametresAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
