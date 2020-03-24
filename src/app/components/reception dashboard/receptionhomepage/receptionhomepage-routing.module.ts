import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReceptionhomepageComponent} from './receptionhomepage.component';
import {AppointmentsComponent} from '../appointments/appointments.component';

const routes: Routes = [{
  path: '', component: ReceptionhomepageComponent,
  children: [
    {path: '', component: AppointmentsComponent}
  ]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ReceptionhomepageRoutingModule {
}
