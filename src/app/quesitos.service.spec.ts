import { TestBed } from '@angular/core/testing';

import { QuesitosService } from './quesitos.service';

describe('QuesitosService', () => {
  let service: QuesitosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuesitosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
