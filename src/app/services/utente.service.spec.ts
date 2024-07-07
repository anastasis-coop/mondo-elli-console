import { TestBed } from '@angular/core/testing';

import { UtenteService } from './utente.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UtenteService', () => {
  let service: UtenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UtenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
