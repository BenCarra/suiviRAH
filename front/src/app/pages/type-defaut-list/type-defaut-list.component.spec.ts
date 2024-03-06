import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeDefautListComponent } from './type-defaut-list.component';

describe('TypeDefautListComponent', () => {
  let component: TypeDefautListComponent;
  let fixture: ComponentFixture<TypeDefautListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeDefautListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeDefautListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
