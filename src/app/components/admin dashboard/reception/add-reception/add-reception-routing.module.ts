import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddReceptionComponent} from './add-reception.component';


const routes: Routes = [{
  path: '', component: AddReceptionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddReceptionRoutingModule {
}
