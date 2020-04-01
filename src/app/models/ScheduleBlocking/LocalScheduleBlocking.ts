import {CalendarEvent} from 'calendar-utils';

export class LocalScheduleBlocking implements CalendarEvent {

  color = {
    primary: '#123',
    secondary: '#123'
  };

  end: Date;
  id: number;
  start: Date;
  title: string;

  userId: number;
  reason: string;

  action: string;


  constructor(id: number, start: Date, end: Date, userId: number, reason: string) {
    this.end = end;
    this.id = id;
    this.start = start;
    this.title = reason || 'Schedule blocking';
    this.userId = userId;
    this.reason = reason;
  }
}
