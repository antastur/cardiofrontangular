import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearequipoComponent } from './crearequipo.component';

describe('CrearequipoComponent', () => {
  let component: CrearequipoComponent;
  let fixture: ComponentFixture<CrearequipoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearequipoComponent]
    });
    fixture = TestBed.createComponent(CrearequipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
