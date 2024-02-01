/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LugaresService } from './lugares.service';

describe('Service: Lugares', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LugaresService]
    });
  });

  it('should ...', inject([LugaresService], (service: LugaresService) => {
    expect(service).toBeTruthy();
  }));
});
