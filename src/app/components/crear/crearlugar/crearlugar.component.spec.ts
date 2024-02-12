/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrearlugarComponent } from './crearlugar.component';

describe('CrearlugarComponent', () => {
  let component: CrearlugarComponent;
  let fixture: ComponentFixture<CrearlugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearlugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearlugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
