import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeTacheListComponent } from './type-tache-list.component';

describe('TypeTacheListComponent', () => {
  let component: TypeTacheListComponent;
  let fixture: ComponentFixture<TypeTacheListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeTacheListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeTacheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
