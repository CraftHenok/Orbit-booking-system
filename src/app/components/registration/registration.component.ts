import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegistrationComponent implements OnInit {

  hide = true;
  doctor = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleRole(role: string) {
    this.doctor = !this.doctor;
  }
}
