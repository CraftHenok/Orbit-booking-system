import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleblockingComponent } from './scheduleblocking.component';

describe('ScheduleblockingComponent', () => {
  let component: ScheduleblockingComponent;
  let fixture: ComponentFixture<ScheduleblockingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleblockingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleblockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
