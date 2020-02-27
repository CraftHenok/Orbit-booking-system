import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PatientTitleComponent} from './patient-title.component';


const routes: Routes = [
  {
    path: '', component: PatientTitleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientTitleRoutingModule {
}
