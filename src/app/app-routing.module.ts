import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './services/Auth Guard/auth-guard.service';


const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin',
    loadChildren: () => import('./components/admin dashboard/adminhomepage/adminhomepage.module').then(m => m.AdminhomepageModule),
    canActivate: [AuthGuardService],
    data: {
      expectedRole: 'A'
    }
  },
  {
    path: 'doctor',
    loadChildren: () => import('./components/doctor dashboard/doctorhomepage/doctorhomepage.module').then(m => m.DoctorhomepageModule),
    canActivate: [AuthGuardService],
    data: {
      expectedRole: 'D'
    }
  },
  {
    path: 'reception',
    loadChildren: () => import('./components/reception dashboard/receptionhomepage/receptionhomepage.module')
      .then(m => m.ReceptionhomepageModule),
    canActivate: [AuthGuardService],
    data: {
      expectedRole: 'R'
    }
  },
  {path: '**', redirectTo: '/', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
