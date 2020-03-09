import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DurationComponent} from './duration.component';


const routes: Routes = [
  {
    path: '', component: DurationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DurationRoutingModule {
}
