import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdddoctorComponent} from './adddoctor.component';


const routes: Routes = [{
  path: '', component: AdddoctorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdddoctorRoutingModule {
}
