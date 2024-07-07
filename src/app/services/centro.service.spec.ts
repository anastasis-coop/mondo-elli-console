import { TestBed } from '@angular/core/testing';

import { CentroService } from './centro.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CentroService', () => {
  let service: CentroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CentroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
