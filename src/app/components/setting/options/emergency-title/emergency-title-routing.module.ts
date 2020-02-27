import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EmergencyTitleComponent} from './emergency-title.component';


const routes: Routes = [{
  path: '', component: EmergencyTitleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergencyTitleRoutingModule {
}
