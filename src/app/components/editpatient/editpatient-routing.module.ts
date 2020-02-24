import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EditpatientComponent} from './editpatient.component';


const routes: Routes = [{
  path: '', component: EditpatientComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditpatientRoutingModule {
}
