import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeUtilisateurListComponent } from './type-utilisateur-list.component';

describe('TypeUtilisateurListComponent', () => {
  let component: TypeUtilisateurListComponent;
  let fixture: ComponentFixture<TypeUtilisateurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeUtilisateurListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TypeUtilisateurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
