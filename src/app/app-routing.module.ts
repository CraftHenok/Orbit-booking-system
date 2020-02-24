import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentsComponent} from './components/appointments/appointments.component';


const routes: Routes = [
  {path: '', component: AppointmentsComponent},
  {path: 'doctors', loadChildren: () => import('./components/doctors/doctors.module').then(m => m.DoctorsModule)},
  {path: 'patients', loadChildren: () => import('./components/patients/patients.module').then(m => m.PatientsModule)},
  {path: 'setting', loadChildren: () => import('./components/setting/setting.module').then(m => m.SettingModule)},
  {path: 'addDoctor', loadChildren: () => import('./components/adddoctor/adddoctor.module').then(m => m.AdddoctorModule)},
  {path: 'addPatient', loadChildren: () => import('./components/addpatient/addpatient.module').then(m => m.AddpatientModule)},
  {
    path: 'editPatient/:patientId',
    loadChildren: () => import('./components/editpatient/editpatient.module').then(m => m.EditpatientModule)
  },
  {
    path: 'editDoctor/:doctorId',
    loadChildren: () => import('./components/editdoctor/edit-doctor.module').then(m => m.EditDoctorModule)
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
