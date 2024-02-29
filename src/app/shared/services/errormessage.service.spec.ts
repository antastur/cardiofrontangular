/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ErrormessageService } from './errormessage.service';

describe('Service: Errormessage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrormessageService]
    });
  });

  it('should ...', inject([ErrormessageService], (service: ErrormessageService) => {
    expect(service).toBeTruthy();
  }));
});
