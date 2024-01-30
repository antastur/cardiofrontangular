import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerlugaresComponent } from './verlugares.component';

describe('VerlugaresComponent', () => {
  let component: VerlugaresComponent;
  let fixture: ComponentFixture<VerlugaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerlugaresComponent]
    });
    fixture = TestBed.createComponent(VerlugaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
