import { TestBed } from '@angular/core/testing';

import { ScheduleBlockingService } from './schedule-blocking.service';

describe('ScheduleBlockingService', () => {
  let service: ScheduleBlockingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleBlockingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
