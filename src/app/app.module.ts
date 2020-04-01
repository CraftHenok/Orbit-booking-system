import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import {HomepageComponent} from './components/homepage/homepage.component';
import {LoginComponent} from './components/login/login.component';
import {JwtModule} from '@auth0/angular-jwt';
import {DialogFeatureModuleModule} from './components/dialogs/dialog-feature-module.module';
import {MatIconModule} from '@angular/material/icon';
import {OwlNativeDateTimeModule} from 'ng-pick-datetime';

// ng g module moduleName --flat --routing

export function tokenGetter() {
  return localStorage.getItem('Authorization');
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
  ],
  imports: [
    DialogFeatureModuleModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    OwlNativeDateTimeModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: adapterFactory}),
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        headerName: 'Authorization',
        whitelistedDomains: ['localhost:8080'],
        blacklistedRoutes: ['localhost:8080/account/login', 'localhost:8080/account/register']
      }
    }),
    FormsModule,
    MatIconModule
  ],
  providers: [],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
