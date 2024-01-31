import { TestBed } from '@angular/core/testing';

import { CrearpreguntaService } from './crearpregunta.service';

describe('CrearpreguntaService', () => {
  let service: CrearpreguntaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearpreguntaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
