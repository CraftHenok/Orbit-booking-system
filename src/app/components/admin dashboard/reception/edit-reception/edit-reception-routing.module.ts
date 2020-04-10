import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditReceptionComponent} from './edit-reception.component';


const routes: Routes = [{
  path: '', component: EditReceptionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditReceptionRoutingModule {
}
