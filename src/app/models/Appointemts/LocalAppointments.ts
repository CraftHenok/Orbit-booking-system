import {CalendarEvent} from 'calendar-utils';

/**
 * Local appointment
 * Model for local appointment used in this local angular app
 */
export class LocalAppointments implements CalendarEvent {

  /** the unique id that identifies this appointment */
  id: number;

  /** the appointment start date */
  start: Date;

  /** the appointment ending date */
  end: Date;

  /** the title of the appointment  */
  title: string;

  /** the id of the patient that book this appointment */
  patientId: number;

  /** the id of the appointment type id from appointment-type model */
  appointmentTypeId: string;

  /** the id of the appointment status id from appointment-status model */
  appointmentStatusId: string;

  /** if the appointment is served = true or false if it's pending */
  isServed: boolean;

  /** the doctor that represents this appointment */
  servedBy: number;


  // optional fields = you are not required to submit this info
  // and are not sent to the backend

  /** if the appointment is all day long set allDay to true default false */
  allDay = false;

  /** color of the appointment card when placed in a card */
  color: { primary: string; secondary: string; };

  /** custom css class to use for appointment card */
  cssClass = 'my-custom-class';

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


  action: string;


}
