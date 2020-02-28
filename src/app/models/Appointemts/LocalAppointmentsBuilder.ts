import {LocalAppointments} from './LocalAppointments';
import {Color} from '../Color';
import {DateManager} from '../../utility/dateManager';

export class LocalAppointmentsBuilder {
  private appointment = new LocalAppointments();

  constructor(id: number, PatientId: number, AppointmentType: string, AppointmentStatus: string, start: Date,
              end: Date, IsServed: boolean, ServedBy: number) {
    this.appointment.id = id;
    this.appointment.patientId = PatientId;
    this.appointment.appointmentTypeId = AppointmentType;
    this.appointment.appointmentStatusId = AppointmentStatus;
    this.appointment.start = start;
    this.appointment.end = end;
    this.appointment.isServed = IsServed;
    this.appointment.servedBy = ServedBy;
    this.appointment.title
      = `Patient id: ${PatientId}<br> Duration: ${DateManager.findDuration(start, end)} min <br> Is Served: ${IsServed}`;
  }

  setColor() {
    const currentDate = new Date();
    // past
    if (currentDate > this.appointment.start) {
      if (this.appointment.isServed) {
        this.appointment.color = Color.getColorOf('blue');
      } else {
        this.appointment.color = Color.getColorOf('red');
      }
    } else {
      this.appointment.color = Color.getColorOf('yellow');
    }
    return this;
  }

  setRandomColor() {
    this.appointment.color = Color.getRandomColor();
    return this;
  }

  changeDraggable(state: boolean) {
    this.appointment.draggable = state;
    return this;
  }

  changeResizableState(beforeStart: boolean, afterEnd: boolean) {
    this.appointment.resizable.afterEnd = afterEnd;
    this.appointment.resizable.beforeStart = beforeStart;
  }

  makeAllDay() {
    this.appointment.allDay = true;
    return this;
  }

  build() {
    return this.appointment;
  }

}
