import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSuivisProjetComponent } from './page-suivis-projet.component';

describe('PageSuivisProjetComponent', () => {
  let component: PageSuivisProjetComponent;
  let fixture: ComponentFixture<PageSuivisProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSuivisProjetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageSuivisProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
