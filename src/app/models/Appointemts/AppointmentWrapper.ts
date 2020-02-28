import {LocalAppointmentsBuilder} from './LocalAppointmentsBuilder';
import {LocalAppointments} from './LocalAppointments';
import {RemoteAppointment} from './RemoteAppointment';

export class AppointmentWrapper {

  static toLocalAppointment(remoteAppointment: RemoteAppointment): LocalAppointments {
    return new LocalAppointmentsBuilder(remoteAppointment.id, remoteAppointment.patientId, remoteAppointment.appointmentTypeId,
      remoteAppointment.appointmentStatusId, new Date(remoteAppointment.startDateTime),
      new Date(remoteAppointment.endDateTime), remoteAppointment.isServed,
      remoteAppointment.servedBy).setColor().build();
  }

  static toRemoteAppointment(localAppointments: LocalAppointments): RemoteAppointment {
    return new RemoteAppointment(localAppointments.id, localAppointments.patientId, localAppointments.appointmentTypeId,
      localAppointments.appointmentStatusId, localAppointments.start, localAppointments.end,
      localAppointments.isServed, localAppointments.servedBy);
  }

  static toLocalAppointmentBatch(remoteAppointments: RemoteAppointment[]): LocalAppointments[] {
    const localAppointments: LocalAppointments[] = [];
    for (const ra of remoteAppointments) {
      localAppointments.push(this.toLocalAppointment(ra));
    }
    return localAppointments;
  }


}
