import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GeneralStatus} from '../../../../models/GeneralStatus';
import {AppointmentStatusService} from '../../../../services/Appointments/Status/appointment-status.service';
import {AddComponent} from '../add/add.component';
import {MatDialog} from '@angular/material/dialog';
import {Variables} from '../../../../utility/variables';
import {SettingDialogData} from '../../../../utility/settingDialogData';

@Component({
  selector: 'app-appointment-status',
  templateUrl: './appointment-status.component.html',
  styleUrls: ['../patient-title/patient-title.component.css']
})
export class AppointmentStatusComponent implements OnInit, OnDestroy {

  dataSource: GeneralStatus[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private appointmentStatusService: AppointmentStatusService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscription.add(this.appointmentStatusService.get().subscribe(
      result => {
        this.dataSource = result;
      },
      error => {
        console.error(error);
      }
    ));
  }

  openDialogWith(map: Map<string, string>) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: Variables.dialogSmallWidth,
      data: map
    });

    dialogRef.afterClosed().subscribe(result => {
      const generalStatus = new GeneralStatus();
      generalStatus.status = result.get('value');
      generalStatus.id = result.get('id');
      switch (result.get('action')) {
        case 'A':
          this.add(generalStatus);
          break;
        case 'D':
          this.delete(generalStatus);
          break;
        case 'U':
          this.update(generalStatus);
          break;
        default:
          console.log('unknown value passed');
      }
    });
  }

  itemClicked(generalStatus: GeneralStatus) {
    this.openDialogWith(SettingDialogData.prepareForOld(generalStatus.id.toString(), generalStatus.status, 'Appointment status'));
  }

  addClicked() {
    this.openDialogWith(SettingDialogData.prepareForNew('Appointment status'));
  }

  private add(generalStatus: GeneralStatus) {
    this.subscription.add(this.appointmentStatusService.save(generalStatus).subscribe(
      result => {
        this.dataSource.push(result);
      }, error => {
        console.error(error);
      }
    ));
  }

  private update(generalStatus: GeneralStatus) {
    this.subscription.add(this.appointmentStatusService.edit(generalStatus).subscribe(
      result => {
        if (result > 0) {
          const index = this.dataSource.findIndex(it => it.id === generalStatus.id);
          this.dataSource[index].status = generalStatus.status;
        }
      }, error => {
        console.error(error);
      }
    ));

  }

  private delete(generalStatus: GeneralStatus) {
    this.subscription.add(this.appointmentStatusService.delete(generalStatus).subscribe(
      result => {
        if (result > 0) {
          this.dataSource = this.dataSource.filter(it => it.id !== generalStatus.id);
        }
      }, error => {
        console.error(error);
      }
    ));

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
