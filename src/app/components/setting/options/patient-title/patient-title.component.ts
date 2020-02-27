import {Component, OnInit} from '@angular/core';
import {GeneralStatus} from '../../../../models/GeneralStatus';
import {Subscription} from 'rxjs';
import {AppointmentsServices} from '../../../../services/Appointments/appointments-services';
import {PatientsService} from '../../../../services/Patients/patients.service';
import {GeneralTitle} from '../../../../models/GeneralTitle';

@Component({
  selector: 'app-patient-title',
  templateUrl: './patient-title.component.html',
  styleUrls: ['./patient-title.component.css']
})
export class PatientTitleComponent implements OnInit {

  dataSource: GeneralTitle[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private patientsService: PatientsService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.patientsService.getPatientTitle().subscribe(
      result => {
        this.dataSource = result;
      },
      error => {
        console.error(error);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
