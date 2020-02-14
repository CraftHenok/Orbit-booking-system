import {LocalAppointments} from './LocalAppointments';
import {Color} from '../Color';

export class LocalAppointmentsBuilder {
  private appointment = new LocalAppointments();

  constructor(PatientId: number, AppointmentType: string, AppointmentStatus: string, start: Date,
              end: Date, IsServed: boolean, ServedBy: number) {
    this.appointment.patientId = PatientId;
    this.appointment.appointmentType = AppointmentType;
    this.appointment.appointmentStatus = AppointmentStatus;
    this.appointment.start = start;
    this.appointment.end = end;
    this.appointment.isServed = IsServed;
    this.appointment.servedBy = ServedBy;
  }

  setColor(color: string) {
    this.appointment.color = Color.getColorOf(color);
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
