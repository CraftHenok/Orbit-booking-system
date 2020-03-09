import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GeneralType} from '../../../../models/GeneralType';
import {AppointmentTypeService} from '../../../../services/Appointments/Type/appointment-type.service';
import {AddComponent} from '../add/add.component';
import {MatDialog} from '@angular/material/dialog';
import {Variables} from '../../../../utility/variables';
import {SettingDialogData} from '../../../../utility/settingDialogData';

@Component({
  selector: 'app-appointment-type',
  templateUrl: './appointment-type.component.html',
  styleUrls: ['../patient-title/patient-title.component.css']
})
export class AppointmentTypeComponent implements OnInit, OnDestroy {


  dataSource: GeneralType[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private appointmentTypeService: AppointmentTypeService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscription.add(this.appointmentTypeService.get().subscribe(
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
      const generalType = new GeneralType();
      generalType.type = result.get('value');
      generalType.id = result.get('id');
      switch (result.get('action')) {
        case 'A':
          this.add(generalType);
          break;
        case 'D':
          this.delete(generalType);
          break;
        case 'U':
          this.update(generalType);
          break;
        default:
          console.log('unknown value passed');
      }
    });
  }

  itemClicked(type: GeneralType) {
    this.openDialogWith(SettingDialogData.prepareForOld(type.id.toString(), type.type, 'Appointment type'));
  }

  addClicked() {
    this.openDialogWith(SettingDialogData.prepareForNew('Appointment type'));
  }

  private add(generalType: GeneralType) {
    this.subscription.add(this.appointmentTypeService.save(generalType).subscribe(
      result => {
        this.dataSource.push(result);
      }, error => {
        console.error(error);
      }
    ));
  }

  private update(generalType: GeneralType) {
    this.subscription.add(this.appointmentTypeService.edit(generalType).subscribe(
      result => {
        if (result > 0) {
          const index = this.dataSource.findIndex(it => it.id === generalType.id);
          this.dataSource[index].type = generalType.type;
        }
      }, error => {
        console.error(error);
      }
    ));

  }

  private delete(generalType: GeneralType) {
    this.subscription.add(this.appointmentTypeService.delete(generalType).subscribe(
      result => {
        if (result > 0) {
          this.dataSource = this.dataSource.filter(it => it.id !== generalType.id);
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
