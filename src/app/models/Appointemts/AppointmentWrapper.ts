import {LocalAppointmentsBuilder} from './LocalAppointmentsBuilder';
import {LocalAppointments} from './LocalAppointments';
import {RemoteAppointment} from './RemoteAppointment';

/**
 * Appointment wrapper
 * use this class to convert to local appointment to remote appointment and vise versa
 */
export class AppointmentWrapper {

  /**
   * Convert a remote appointment to local appointment
   * @param remoteAppointment - the remote appointment to convert
   * @returns - the converted local appointment
   */
  static toLocalAppointment(remoteAppointment: RemoteAppointment): LocalAppointments {
    return new LocalAppointmentsBuilder(remoteAppointment.id, remoteAppointment.patientId, remoteAppointment.appointmentTypeId,
      remoteAppointment.appointmentStatusId, new Date(remoteAppointment.startDateTime),
      new Date(remoteAppointment.endDateTime), remoteAppointment.isServed,
      remoteAppointment.servedBy).setColor().build();
  }

  /**
   * Convert a local appointment to remote appointment
   * @param localAppointments - the local appointment to convert
   * @returns - the converted remote appointment
   */
  static toRemoteAppointment(localAppointments: LocalAppointments): RemoteAppointment {
    return new RemoteAppointment(localAppointments.id, localAppointments.patientId, localAppointments.appointmentTypeId,
      localAppointments.appointmentStatusId, localAppointments.start, localAppointments.end,
      localAppointments.isServed, localAppointments.servedBy);
  }

  /**
   * convert list of remote appointments to local appointments
   * @param remoteAppointments - list of remote appointments to convert
   * @returns - converted local appointments
   */
  static toLocalAppointmentBatch(remoteAppointments: RemoteAppointment[]): LocalAppointments[] {
    const localAppointments: LocalAppointments[] = [];
    for (const ra of remoteAppointments) {
      localAppointments.push(this.toLocalAppointment(ra));
    }
    return localAppointments;
  }


}
