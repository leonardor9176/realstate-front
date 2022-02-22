import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCardAdminComponent } from './property-card-admin.component';

describe('PropertyCardAdminComponent', () => {
  let component: PropertyCardAdminComponent;
  let fixture: ComponentFixture<PropertyCardAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyCardAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
