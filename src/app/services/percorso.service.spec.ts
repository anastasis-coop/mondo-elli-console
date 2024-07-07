import { TestBed } from '@angular/core/testing';

import { PercorsoService } from './percorso.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PercorsoService', () => {
  let service: PercorsoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(PercorsoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
