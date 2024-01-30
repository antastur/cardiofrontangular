import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VervehiculosComponent } from './vervehiculos.component';

describe('VervehiculosComponent', () => {
  let component: VervehiculosComponent;
  let fixture: ComponentFixture<VervehiculosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VervehiculosComponent]
    });
    fixture = TestBed.createComponent(VervehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
