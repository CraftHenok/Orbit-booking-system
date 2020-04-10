import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PatientsRoutingModule} from './patients-routing.module';
import {PatientsComponent} from './patients.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {PatientsdetaildialogComponent} from '../../../dialogs/patientsdetaildialog/patientsdetaildialog.component';
import {ConfirmActionDialogComponent} from '../../../dialogs/confirm-action-dialog/confirm-action-dialog.component';
import {NumberToBooleanModule} from '../../../../customPipes/numberToBoolean/number-to-boolean.module';


@NgModule({
  declarations: [
    PatientsComponent,
    PatientsdetaildialogComponent,
    ConfirmActionDialogComponent
  ],
  imports: [
    CommonModule,
    PatientsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NumberToBooleanModule,
    MatDialogModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
  ],
  entryComponents: [
    PatientsdetaildialogComponent,
    ConfirmActionDialogComponent
  ]
})
export class PatientsModule {
}
