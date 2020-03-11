import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppointmentsComponent} from './components/show/appointments/appointments.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {AddEditDialogComponent} from './components/dialogs/addEditDialog/addEditDialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ShowDoctorsComponent} from './components/show/appointments/show-doctors/show-doctors.component';
import {MatSelectModule} from '@angular/material/select';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import {ForgetIdComponent} from './components/dialogs/forget-id/forget-id.component';
import {QuickAddComponent} from './components/dialogs/quick-add/quick-add.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {NgxSpinnerModule} from 'ngx-spinner';

// ng g module moduleName --flat --routing


@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    ShowDoctorsComponent,
    AddEditDialogComponent,
    ForgetIdComponent,
    QuickAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatButtonToggleModule,
    MatInputModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    MatDialogModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatRippleModule,
    MatTooltipModule,
    FormsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule
  ],
  entryComponents: [
    AddEditDialogComponent,
    ForgetIdComponent,
    QuickAddComponent
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
