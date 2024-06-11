import { TestBed } from '@angular/core/testing';

import { SpiritCenterService } from './spirit-center.service';

describe('SpiritCenterService', () => {
  let service: SpiritCenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpiritCenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
