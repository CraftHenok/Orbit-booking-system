import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminhomepageComponent} from './adminhomepage.component';


const routes: Routes = [
  {
    path: '', component: AdminhomepageComponent,
    children: [
      {path: 'doctors', loadChildren: () => import('../showdoctors/doctors.module').then(m => m.DoctorsModule)},
      {path: 'patients', loadChildren: () => import('../showpatients/patients.module').then(m => m.PatientsModule)},
      {path: 'setting', loadChildren: () => import('../setting/setting.module').then(m => m.SettingModule)},
      {path: 'addDoctor', loadChildren: () => import('../adddoctor/adddoctor.module').then(m => m.AdddoctorModule)},
      {path: 'addPatient', loadChildren: () => import('../addpatient/addpatient.module').then(m => m.AddpatientModule)},
      {
        path: 'editPatient/:patientId',
        loadChildren: () => import('../editpatient/editpatient.module').then(m => m.EditpatientModule)
      },
      {
        path: 'editDoctor/:doctorId',
        loadChildren: () => import('../editdoctor/edit-doctor.module').then(m => m.EditDoctorModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminhomepageRoutingModule {
}
