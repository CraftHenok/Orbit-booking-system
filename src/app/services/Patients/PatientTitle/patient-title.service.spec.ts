import { TestBed } from '@angular/core/testing';

import { PatientTitleService } from './patient-title.service';

describe('PatientTitleService', () => {
  let service: PatientTitleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientTitleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
