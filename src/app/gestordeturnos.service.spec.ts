import { TestBed } from '@angular/core/testing';

import { GestordeturnosService } from './gestordeturnos.service';

describe('GestordeturnosService', () => {
  let service: GestordeturnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestordeturnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
