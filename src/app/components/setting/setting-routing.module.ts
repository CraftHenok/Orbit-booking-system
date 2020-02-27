import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SettingComponent} from './setting.component';
import {AppointmentStatusComponent} from './options/appointment-status/appointment-status.component';
import {AppointmentTypeComponent} from './options/appointment-type/appointment-type.component';


const routes: Routes = [{
  path: '', component: SettingComponent,
  children: [
    {
      path: 'appointmentType',
      loadChildren: () => import('./options/appointment-type/appointment-type.module').then(m => m.AppointmentTypeModule)
    },
    {
      path: 'appointmentStatus',
      loadChildren: () => import('./options/appointment-status/appointment-status.module').then(m => m.AppointmentStatusModule)
    },
    {
      path: 'emergencyTitle',
      loadChildren: () => import('./options/emergency-title/emergency-title.module').then(m => m.EmergencyTitleModule)
    },
    {
      path: 'patientTitle',
      loadChildren: () => import('./options/patient-title/patient-title.module').then(m => m.PatientTitleModule)
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule {
}
