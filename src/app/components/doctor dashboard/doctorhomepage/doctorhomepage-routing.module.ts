import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorhomepageComponent} from './doctorhomepage.component';
import {DoctorsappointmentComponent} from '../doctorsappointment/doctorsappointment.component';

const routes: Routes = [
  {
    path: '', component: DoctorhomepageComponent,
    children: [
      {
        path: '', component: DoctorsappointmentComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorhomepageRoutingModule {
}
