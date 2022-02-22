import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProperyPageComponent } from './propery-page.component';

describe('ProperyPageComponent', () => {
  let component: ProperyPageComponent;
  let fixture: ComponentFixture<ProperyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProperyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProperyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
