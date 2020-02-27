import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppointmentTypeComponent} from './appointment-type.component';


const routes: Routes = [{
  path: '', component: AppointmentTypeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentTypeRoutingModule {
}
