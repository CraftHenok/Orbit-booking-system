import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRippleModule} from '@angular/material/core';


@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    RouterModule,
    MatTooltipModule,
    MatRippleModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule {
}
