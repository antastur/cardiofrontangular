import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerformacionesComponent } from './verformaciones.component';

describe('VerformacionesComponent', () => {
  let component: VerformacionesComponent;
  let fixture: ComponentFixture<VerformacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerformacionesComponent]
    });
    fixture = TestBed.createComponent(VerformacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
