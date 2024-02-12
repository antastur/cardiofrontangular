/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DarClienteService } from './darCliente.service';

describe('Service: DarCliente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DarClienteService]
    });
  });

  it('should ...', inject([DarClienteService], (service: DarClienteService) => {
    expect(service).toBeTruthy();
  }));
});
