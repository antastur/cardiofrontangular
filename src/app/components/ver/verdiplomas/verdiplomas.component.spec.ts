/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VerdiplomasComponent } from './verdiplomas.component';

describe('VerdiplomasComponent', () => {
  let component: VerdiplomasComponent;
  let fixture: ComponentFixture<VerdiplomasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerdiplomasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdiplomasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
