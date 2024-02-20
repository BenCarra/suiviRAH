import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTachesComponent } from './list-taches.component';

describe('ListTachesComponent', () => {
  let component: ListTachesComponent;
  let fixture: ComponentFixture<ListTachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTachesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
