import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreardiplomaComponent } from './creardiploma.component';

describe('CreardiplomaComponent', () => {
  let component: CreardiplomaComponent;
  let fixture: ComponentFixture<CreardiplomaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreardiplomaComponent]
    });
    fixture = TestBed.createComponent(CreardiplomaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
