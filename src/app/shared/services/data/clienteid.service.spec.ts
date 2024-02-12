/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClienteidService } from './clienteid.service';

describe('Service: Clienteid', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClienteidService]
    });
  });

  it('should ...', inject([ClienteidService], (service: ClienteidService) => {
    expect(service).toBeTruthy();
  }));
});
