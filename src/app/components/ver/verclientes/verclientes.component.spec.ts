import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerclientesComponent } from './verclientes.component';

describe('VerclientesComponent', () => {
  let component: VerclientesComponent;
  let fixture: ComponentFixture<VerclientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerclientesComponent]
    });
    fixture = TestBed.createComponent(VerclientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
