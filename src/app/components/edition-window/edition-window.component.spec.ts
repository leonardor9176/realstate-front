import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditionWindowComponent } from './edition-window.component';

describe('EditionWindowComponent', () => {
  let component: EditionWindowComponent;
  let fixture: ComponentFixture<EditionWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditionWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditionWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
