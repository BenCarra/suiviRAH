import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageUtilisateursComponent } from './page-utilisateurs.component';

describe('PageUtilisateursComponent', () => {
  let component: PageUtilisateursComponent;
  let fixture: ComponentFixture<PageUtilisateursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageUtilisateursComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageUtilisateursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
