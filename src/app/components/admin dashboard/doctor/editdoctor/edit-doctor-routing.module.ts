import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EditdoctorComponent} from './editdoctor.component';


const routes: Routes = [{
  path: '', component: EditdoctorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDoctorRoutingModule {
}
