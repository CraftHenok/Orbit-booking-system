import {CalendarEvent} from 'calendar-utils';

/**
 * Local appointment
 * Model for local appointment used in this local angular app
 */
export class LocalAppointments implements CalendarEvent {

  id: number;

  /** the appointment start date */
  start: Date;

  /** the appointment ending date */
  end: Date;

  /** the title of the appointment
   *  title of the appointment is what's shown on the card
   */
  title: string;

  /** the id of the patient that book this appointment */
  patientId: number;

  /** the id of the appointment type id from appointment-type model */
  appointmentTypeId: string;

  /** the id of the appointment status id from appointment-status model */
  appointmentStatusId: string;

  /**
   * if the appointment is handled by doctor
   * isServed is true
   * false if it's still pending
   */
  isServed: boolean;

  /**
   * the id of the doctor that is responsible
   * to handle this appointment
   */
  servedBy: number;


  // the following fields are properties to configure the calender event
  // you are not required to submit and aren't sent to the backend

  /** if the appointment is all day long set allDay to true default false */
  allDay = false;

  /** color of the appointment card when placed in a card */
  color: { primary: string; secondary: string; };

  /** if the appointment card is draggable or not.
   * true = can be dragged to other day,week.
   * false = fixed can't be moved
   * default true
   */
  draggable = true;

  /** if the appointment card is resizable or not. true = can be enlarged or reduced. false = fixed can't be resized
   * this action result in update operation on start and end date
   */
  resizable: { beforeStart: boolean; afterEnd: boolean } = {beforeStart: true, afterEnd: true};


  /**
   * action represents the response from a dialog
   * refer to variables to see available actions or responses that
   * can be returned from a dialog
   */
  action: string;


}
