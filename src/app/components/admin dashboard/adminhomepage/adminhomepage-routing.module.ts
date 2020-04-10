import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminhomepageComponent} from './adminhomepage.component';


const routes: Routes = [
  {
    path: '', component: AdminhomepageComponent,
    children: [
      {path: '', loadChildren: () => import('../doctor/showdoctors/doctors.module').then(m => m.DoctorsModule)},
      {path: 'patients', loadChildren: () => import('../patient/showpatients/patients.module').then(m => m.PatientsModule)},
      {path: 'setting', loadChildren: () => import('../setting/setting.module').then(m => m.SettingModule)},
      {path: 'addDoctor', loadChildren: () => import('../doctor/adddoctor/adddoctor.module').then(m => m.AdddoctorModule)},
      {path: 'addPatient', loadChildren: () => import('../patient/addpatient/addpatient.module').then(m => m.AddpatientModule)},
      {
        path: 'editPatient/:patientId',
        loadChildren: () => import('../patient/editpatient/editpatient.module').then(m => m.EditpatientModule)
      },
      {
        path: 'reception',
        loadChildren: () => import('../reception/show-reception/show-reception.module.js').then(m => m.ShowReceptionModule)
      },
      {
        path: 'addReception',
        loadChildren: () => import('../reception/add-reception/add-reception.module').then(m => m.AddReceptionModule)
      },
      {
        path: 'editReception/:id',
        loadChildren: () => import('../reception/edit-reception/edit-reception.module').then(m => m.EditReceptionModule)
      },
      {
        path: 'editDoctor/:doctorId',
        loadChildren: () => import('../doctor/editdoctor/edit-doctor.module').then(m => m.EditDoctorModule)
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
