import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddEditDialogComponent} from './addEditDialog/addEditDialog.component';
import {ForgetIdComponent} from './forget-id/forget-id.component';
import {QuickAddComponent} from './quick-add/quick-add.component';
import {ManageAccountComponent} from './manage-account/manage-account.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatChipsModule} from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
import {OwlDateTimeModule} from 'ng-pick-datetime';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ScheduleblockingComponent} from './scheduleblocking/scheduleblocking.component';
import {ConfirmActionDialogComponent} from './confirm-action-dialog/confirm-action-dialog.component';
import {PatientsdetaildialogComponent} from './patientsdetaildialog/patientsdetaildialog.component';


@NgModule({
  declarations: [
    AddEditDialogComponent,
    ForgetIdComponent,
    QuickAddComponent,
    ScheduleblockingComponent,
    ManageAccountComponent,
    ConfirmActionDialogComponent,
    PatientsdetaildialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatSelectModule,
    OwlDateTimeModule,
    MatCheckboxModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    AddEditDialogComponent,
    ForgetIdComponent,
    QuickAddComponent,
    ScheduleblockingComponent,
    ManageAccountComponent,
    ConfirmActionDialogComponent,
    PatientsdetaildialogComponent
  ],
})
export class DialogFeatureModuleModule {
}
