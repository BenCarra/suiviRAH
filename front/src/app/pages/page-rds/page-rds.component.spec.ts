import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRDSComponent } from './page-rds.component';

describe('PageRDSComponent', () => {
  let component: PageRDSComponent;
  let fixture: ComponentFixture<PageRDSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRDSComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageRDSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
