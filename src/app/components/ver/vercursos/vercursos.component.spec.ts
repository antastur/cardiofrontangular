import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VercursosComponent } from './vercursos.component';

describe('VercursosComponent', () => {
  let component: VercursosComponent;
  let fixture: ComponentFixture<VercursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VercursosComponent]
    });
    fixture = TestBed.createComponent(VercursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
