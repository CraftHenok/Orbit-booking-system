import {LocalAppointments} from './LocalAppointments';
import {Color} from '../Color';
import {DateManager} from '../../utility/dateManager';

/**
 * Local appointment builder
 * there are multiple options to build local appointment
 * use this builder to construct local appointment
 */
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

  /**
   * set the appointment card background color
   * uses blue, red and yellow color
   * blue for past and served appointment
   * red for past but unserved appointment
   * yellow for future appointment
   */
  setColor() {
    const isPastAppointment = new Date() > this.appointment.start;
    if (isPastAppointment) {
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

  /**
   * Change the appointment card draggable state
   * @param state -is the card draggable
   */
  changeDraggable(state: boolean) {
    this.appointment.draggable = state;
    return this;
  }

  /**
   * Change the resizable state of the appointment
   * @param beforeStart - is resizable at the beginning appointment
   * @param afterEnd - is resizable at the end of the appointment
   */
  changeResizableState(beforeStart: boolean, afterEnd: boolean) {
    this.appointment.resizable.afterEnd = afterEnd;
    this.appointment.resizable.beforeStart = beforeStart;
  }

  /**
   * Make the appointment all day
   * initial false
   */
  makeAllDay() {
    this.appointment.allDay = true;
    return this;
  }

  /**
   * return the built local appointment
   * @returns local appointment
   */
  build() {
    return this.appointment;
  }

}
