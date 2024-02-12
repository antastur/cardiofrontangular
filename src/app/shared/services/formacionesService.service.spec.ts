/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FormacionesServiceService } from './formacionesService.service';

describe('Service: FormacionesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormacionesServiceService]
    });
  });

  it('should ...', inject([FormacionesServiceService], (service: FormacionesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
