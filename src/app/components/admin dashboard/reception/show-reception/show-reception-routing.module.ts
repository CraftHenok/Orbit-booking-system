import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShowReceptionComponent} from './show-reception.component';

const routes: Routes = [{
  path: '', component: ShowReceptionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowReceptionRoutingModule {
}
