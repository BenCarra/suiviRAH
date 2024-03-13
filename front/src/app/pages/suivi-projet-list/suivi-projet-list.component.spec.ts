import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviProjetListComponent } from './suivi-projet-list.component';

describe('SuiviProjetListComponent', () => {
  let component: SuiviProjetListComponent;
  let fixture: ComponentFixture<SuiviProjetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuiviProjetListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuiviProjetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
