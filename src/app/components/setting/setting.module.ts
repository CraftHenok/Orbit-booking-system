import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SettingRoutingModule} from './setting-routing.module';
import {SettingComponent} from './setting.component';
import {CommonHeaderComponent} from '../common-header/common-header.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    SettingComponent,
    CommonHeaderComponent
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule
  ]
})
export class SettingModule {
}
