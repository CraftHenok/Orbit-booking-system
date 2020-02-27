import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentStatusComponent} from './appointment-status.component';


const routes: Routes = [{
  path: '', component: AppointmentStatusComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentStatusRoutingModule {
}
