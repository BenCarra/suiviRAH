import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEquipesAdminComponent } from './page-equipes-admin.component';

describe('PageEquipesAdminComponent', () => {
  let component: PageEquipesAdminComponent;
  let fixture: ComponentFixture<PageEquipesAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEquipesAdminComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageEquipesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
