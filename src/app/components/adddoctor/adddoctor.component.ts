import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['../addpatient/addpatient.component.css'] // reuse
})
export class AdddoctorComponent implements OnInit {

  hidePassword = true;

  primaryInfo = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.min(6)]]
  });

  appointmentRelatedInfo = this.formBuilder.group({
    displayOrder: ['', Validators.required],
    manageBlock: [false, Validators.required],
    manageBooking: [false, Validators.required],
    isDoctor: [false, Validators.required]
  });


  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

}
