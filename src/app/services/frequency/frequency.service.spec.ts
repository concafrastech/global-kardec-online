import { TestBed } from '@angular/core/testing';

import { FrequencyService } from './frequency.service';

describe('FrequencyService', () => {
  let service: FrequencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrequencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
