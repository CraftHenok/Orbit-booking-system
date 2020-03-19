import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  // {path: 'doctors', loadChildren: () => import('./components/show/doctors/doctors.module').then(m => m.DoctorsModule)},
  // {path: 'patients', loadChildren: () => import('./components/show/patients/patients.module').then(m => m.PatientsModule)},
  // {path: 'setting', loadChildren: () => import('./components/setting/setting.module').then(m => m.SettingModule)},
  // {path: 'addDoctor', loadChildren: () => import('./components/add/adddoctor/adddoctor.module').then(m => m.AdddoctorModule)},
  // {path: 'addPatient', loadChildren: () => import('./components/add/addpatient/addpatient.module').then(m => m.AddpatientModule)},
  // {
  //   path: 'editPatient/:patientId',
  //   loadChildren: () => import('./components/edit/editpatient/editpatient.module').then(m => m.EditpatientModule)
  // },
  // {
  //   path: 'editDoctor/:doctorId',
  //   loadChildren: () => import('./components/edit/editdoctor/edit-doctor.module').then(m => m.EditDoctorModule)
  // },
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
