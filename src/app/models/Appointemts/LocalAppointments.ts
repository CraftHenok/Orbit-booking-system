import {CalendarEvent} from 'calendar-utils';


export class LocalAppointments implements CalendarEvent {
  // required fields...
  start: Date;
  end: Date;
  title: string;
  patientId: number;
  appointmentTypeId: string;
  appointmentStatusId: string;
  isServed: boolean;
  servedBy: number;
  id: number;


  // optional fields
  allDay = false;
  color: { primary: string; secondary: string; };
  cssClass: string;
  draggable = true;
  resizable: { beforeStart: boolean; afterEnd: boolean } = {beforeStart: true, afterEnd: true};

  action: string;


}
