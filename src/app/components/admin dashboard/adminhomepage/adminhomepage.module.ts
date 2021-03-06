import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminhomepageRoutingModule} from './adminhomepage-routing.module';
import {AdminhomepageComponent} from './adminhomepage.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {NavigationModule} from '../../navigation/navigation.module';


@NgModule({
  declarations: [
    AdminhomepageComponent
  ],
  imports: [
    CommonModule,
    AdminhomepageRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    NavigationModule
  ]
})
export class AdminhomepageModule {
}
