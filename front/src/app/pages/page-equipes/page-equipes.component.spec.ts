import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEquipesComponent } from './page-equipes.component';

describe('PageEquipesComponent', () => {
  let component: PageEquipesComponent;
  let fixture: ComponentFixture<PageEquipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEquipesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageEquipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
