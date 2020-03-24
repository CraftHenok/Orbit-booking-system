import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginComponent} from './components/login/login.component';
import {MatCardModule} from '@angular/material/card';
import {JwtModule} from '@auth0/angular-jwt';

// ng g module moduleName --flat --routing

export function tokenGetter() {
  return localStorage.getItem('Authorization');
}

@NgModule({
  declarations: [
    AppComponent,
    AddEditDialogComponent,
    ForgetIdComponent,
    QuickAddComponent,
    HomepageComponent,
    LoginComponent,
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
    JwtModule.forRoot({
      config: {
        tokenGetter,
        headerName: 'Authorization',
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['localhost:8080/account/login', 'localhost:8080/account/register']
      }
    }),
    MatIconModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule,
    MatRippleModule,
    MatTooltipModule,
    FormsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    MatCardModule
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
