import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearclienteComponent } from './crearcliente.component';

describe('CrearclienteComponent', () => {
  let component: CrearclienteComponent;
  let fixture: ComponentFixture<CrearclienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearclienteComponent]
    });
    fixture = TestBed.createComponent(CrearclienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
