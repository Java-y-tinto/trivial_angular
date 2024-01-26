import { TestBed } from '@angular/core/testing';

import { CrearComponenteService } from './crear-componente.service';

describe('CrearComponenteService', () => {
  let service: CrearComponenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearComponenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
