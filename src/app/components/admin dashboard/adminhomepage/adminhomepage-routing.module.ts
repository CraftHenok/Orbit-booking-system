import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminhomepageComponent} from './adminhomepage.component';


const routes: Routes = [
  {
    path: '', component: AdminhomepageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminhomepageRoutingModule {
}
