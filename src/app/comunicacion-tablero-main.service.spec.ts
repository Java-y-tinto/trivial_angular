import { TestBed } from '@angular/core/testing';

import { ComunicacionTableroMainService } from './comunicacion-tablero-main.service';

describe('ComunicacionTableroMainService', () => {
  let service: ComunicacionTableroMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComunicacionTableroMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
