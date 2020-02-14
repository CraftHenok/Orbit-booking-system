import {LocalAppointmentsBuilder} from './LocalAppointmentsBuilder';
import {LocalAppointments} from './LocalAppointments';

export class AppointmentWrapper {

  static toLocalAppointment(remoteAppointment: RemoteAppointment) {
    return new LocalAppointmentsBuilder(remoteAppointment.patientId,
      remoteAppointment.appointmentType, remoteAppointment.appointmentStatus, remoteAppointment.startDateTime,
      remoteAppointment.endDateTime, remoteAppointment.isServed, remoteAppointment.servedBy);
  }

  static toRemoteAppointment(localAppointments: LocalAppointments) {
    return new RemoteAppointment(localAppointments.patientId, localAppointments.appointmentType,
      localAppointments.appointmentStatus, localAppointments.start, localAppointments.end,
      localAppointments.isServed, localAppointments.servedBy);
  }


}
