import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DoctorhomepageComponent} from './doctorhomepage.component';

const routes: Routes = [
  {
    path: '', component: DoctorhomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorhomepageRoutingModule {
}
