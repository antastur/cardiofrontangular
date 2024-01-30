/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuprincipalService } from './menuprincipal.service';

describe('Service: Menuprincipal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuprincipalService]
    });
  });

  it('should ...', inject([MenuprincipalService], (service: MenuprincipalService) => {
    expect(service).toBeTruthy();
  }));
});
