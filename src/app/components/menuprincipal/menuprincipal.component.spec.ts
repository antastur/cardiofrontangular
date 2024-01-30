import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuprincipalComponent } from './menuprincipal.component';

describe('MenuprincipalComponent', () => {
  let component: MenuprincipalComponent;
  let fixture: ComponentFixture<MenuprincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuprincipalComponent]
    });
    fixture = TestBed.createComponent(MenuprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
