import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ShowReceptionRoutingModule} from './show-reception-routing.module';
import {ShowReceptionComponent} from './show-reception.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [
    ShowReceptionComponent
  ],
  imports: [
    CommonModule,
    ShowReceptionRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatPaginatorModule,
    MatTooltipModule
  ]
})
export class ShowReceptionModule {
}
