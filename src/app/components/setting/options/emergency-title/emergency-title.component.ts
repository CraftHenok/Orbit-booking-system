import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GeneralTitle} from '../../../../models/GeneralTitle';
import {EmergencyTitleService} from '../../../../services/Patients/EmergencyTitle/emergency-title.service';
import {AddComponent} from '../add/add.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-emergency-title',
  templateUrl: './emergency-title.component.html',
  styleUrls: ['../patient-title/patient-title.component.css']
})
export class EmergencyTitleComponent implements OnInit, OnDestroy {

  dataSource: GeneralTitle[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private emergencyTitleService: EmergencyTitleService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscription.add(this.emergencyTitleService.get().subscribe(
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

  openDialog() {

    const map: Map<string, string> = new Map();
    map.set('A', 'B');

    const dialogRef = this.dialog.open(AddComponent, {
      width: '400px',
      data: map
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
