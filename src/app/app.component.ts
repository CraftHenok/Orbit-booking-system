import {Component} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Orbit booking system';

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'setting',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/s.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'doctor',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/d.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'patient',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/p.svg')
    );
  }
}
