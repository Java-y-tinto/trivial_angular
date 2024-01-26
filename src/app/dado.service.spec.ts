import { TestBed } from '@angular/core/testing';

import { DadoService } from './dado.service';

describe('DadoService', () => {
  let service: DadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
