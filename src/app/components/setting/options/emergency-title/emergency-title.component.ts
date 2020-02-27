import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeneralStatus} from '../../../../models/GeneralStatus';
import {Subscription} from 'rxjs';
import {AppointmentsServices} from '../../../../services/Appointments/appointments-services';
import {PatientsService} from '../../../../services/Patients/patients.service';
import {GeneralTitle} from '../../../../models/GeneralTitle';

@Component({
  selector: 'app-emergency-title',
  templateUrl: './emergency-title.component.html',
  styleUrls: ['./emergency-title.component.css']
})
export class EmergencyTitleComponent implements OnInit, OnDestroy {

  dataSource: GeneralTitle[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private patientService: PatientsService) {
  }

  ngOnInit(): void {
    this.subscription.add(this.patientService.getEmergencyTitle().subscribe(
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
