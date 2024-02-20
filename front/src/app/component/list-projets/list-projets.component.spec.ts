import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProjetsComponent } from './list-projets.component';

describe('ListProjetsComponent', () => {
  let component: ListProjetsComponent;
  let fixture: ComponentFixture<ListProjetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProjetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProjetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
