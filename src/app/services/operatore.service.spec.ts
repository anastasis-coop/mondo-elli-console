import { TestBed } from '@angular/core/testing';

import { OperatoreService } from './operatore.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OperatoreService', () => {
  let service: OperatoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(OperatoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
