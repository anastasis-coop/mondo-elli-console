import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { IstatService } from './istat.service';

describe('IstatService', () => {
  let service: IstatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(IstatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
