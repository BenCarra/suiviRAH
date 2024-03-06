import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatProjetListComponent } from './etat-projet-list.component';

describe('EtatProjetListComponent', () => {
  let component: EtatProjetListComponent;
  let fixture: ComponentFixture<EtatProjetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatProjetListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EtatProjetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
