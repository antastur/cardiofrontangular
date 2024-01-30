import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerespaciosComponent } from './verespacios.component';

describe('VerespaciosComponent', () => {
  let component: VerespaciosComponent;
  let fixture: ComponentFixture<VerespaciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerespaciosComponent]
    });
    fixture = TestBed.createComponent(VerespaciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
