import {CalendarEvent} from 'calendar-utils';
import {Color} from '../Color';

/**
 * LocalScheduleBlocking
 */
export class LocalScheduleBlocking implements CalendarEvent {

  id: number;


  /**
   * the color of the schedule blocking event
   * when placed on the calender
   */
  color;

  /**
   * the start date of the blocking event
   */
  start: Date;

  /**
   * the end date of the blocking event
   */
  end: Date;


  /**
   * the title to show on the blocking event card
   */
  title: string;

  /**
   * the id of the doctor that submitted this schedule blocking
   */
  userId: number;

  /**
   * the reason behind this schedule blocking
   */
  reason: string;

  /**
   * action represents the response from a dialog
   * refer to variables to see available actions or responses that
   * can be returned from a dialog
   */
  action: string;


  constructor(id: number, start: Date, end: Date, userId: number, reason: string) {
    this.end = end;
    this.id = id;
    this.start = start;
    this.title = reason || 'Schedule blocking';
    this.userId = userId;
    this.reason = reason;
    this.color = Color.getColorOf('scheduleBlocking');
  }

}
