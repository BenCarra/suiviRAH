import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeProjetListComponent } from './type-projet-list.component';

describe('TypeProjetListComponent', () => {
  let component: TypeProjetListComponent;
  let fixture: ComponentFixture<TypeProjetListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeProjetListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeProjetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
