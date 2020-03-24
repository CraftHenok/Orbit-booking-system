import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SettingComponent} from './setting.component';
import {AppointmentTypeComponent} from './options/appointment-type/appointment-type.component';
import {AppointmentStatusComponent} from './options/appointment-status/appointment-status.component';
import {EmergencyTitleComponent} from './options/emergency-title/emergency-title.component';
import {PatientTitleComponent} from './options/patient-title/patient-title.component';
import {DurationComponent} from './options/duration/duration.component';


const routes: Routes = [{
  path: '', component: SettingComponent,
  children: [
    {
      path: '',
      component: AppointmentTypeComponent
    },
    {
      path: 'appointmentStatus',
      component: AppointmentStatusComponent
    },
    {
      path: 'emergencyTitle',
      component: EmergencyTitleComponent
    },
    {
      path: 'patientTitle',
      component: PatientTitleComponent
    },
    {
      path: 'duration',
      component: DurationComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
}
