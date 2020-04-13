import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AddComponent} from '../add/add.component';
import {MatDialog} from '@angular/material/dialog';
import {GeneralStatus} from '../../../../../models/GeneralStatus';
import {AppointmentStatusService} from '../../../../../services/Appointments/Status/appointment-status.service';
import {Variables} from '../../../../../utility/variables';
import {SettingDialogData} from '../../../../../utility/settingDialogData';

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
        this.dataSource.push(...result);
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
        case Variables.actions.saved:
          this.add(generalStatus);
          break;
        case Variables.actions.deleted:
          this.delete(generalStatus);
          break;
        case Variables.actions.updated:
          this.update(generalStatus);
          break;
        default:
          console.log('unknown value passed');
      }
    });
  }

  itemClicked(generalStatus: GeneralStatus) {
    this.openDialogWith(SettingDialogData.prepare('Appointment status', generalStatus.id, generalStatus.status));
  }

  addClicked() {
    this.openDialogWith(SettingDialogData.prepare('Appointment status'));
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
        console.log(result);
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
