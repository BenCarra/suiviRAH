import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdsListComponent } from './rds-list.component';

describe('RdsListComponent', () => {
  let component: RdsListComponent;
  let fixture: ComponentFixture<RdsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RdsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
