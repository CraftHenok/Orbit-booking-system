import { TestBed } from '@angular/core/testing';

import { EmergencyTitleService } from './emergency-title.service';

describe('EmergencyTitleService', () => {
  let service: EmergencyTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
