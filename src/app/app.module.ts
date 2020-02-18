import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppointmentsComponent} from './components/appointments/appointments.component';
import {MaterialDateModule} from './materialDateModule/materialDateModule';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {AddEditDialogComponent} from './components/dialogs/addEditDialog/addEditDialog.component';
import {ReactiveFormsModule} from '@angular/forms';
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
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { ShowDoctorsComponent } from './components/appointments/show-doctors/show-doctors.component';

// ng g module moduleName --flat --routing


@NgModule({
  declarations: [
    AppComponent,
    AppointmentsComponent,
    AddEditDialogComponent,
    ShowDoctorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MaterialDateModule,
    MatButtonToggleModule,
    MatInputModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    MatDialogModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    MatTableModule,
    HttpClientModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule
  ],
  entryComponents: [AddEditDialogComponent],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
