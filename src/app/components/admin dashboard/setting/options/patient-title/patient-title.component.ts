import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddComponent} from '../add/add.component';
import {GeneralTitle} from '../../../../../models/GeneralTitle';
import {PatientTitleService} from '../../../../../services/Patients/PatientTitle/patient-title.service';
import {SettingDialogData} from '../../../../../utility/settingDialogData';
import {Variables} from '../../../../../utility/variables';

@Component({
  selector: 'app-patient-title',
  templateUrl: './patient-title.component.html',
  styleUrls: ['./patient-title.component.css']
})
export class PatientTitleComponent implements OnInit, OnDestroy {

  dataSource: GeneralTitle[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private patientTitleService: PatientTitleService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscription.add(this.patientTitleService.get().subscribe(
      result => {
        this.dataSource.push(...result);
      },
      error => {
        console.error(error);
      }
    ));
  }


  addClicked() {
    this.openDialogWith(SettingDialogData.prepare('Patient title'));
  }

  itemClicked(title: GeneralTitle) {
    this.openDialogWith(SettingDialogData.prepare('Patient title', title.id, title.title));
  }

  private openDialogWith(title: Map<string, string>) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: Variables.dialogSmallWidth,
      data: title
    });

    dialogRef.afterClosed().subscribe(result => {
      const generalTitle = new GeneralTitle();
      generalTitle.title = result.get('value');
      generalTitle.id = result.get('id');
      switch (result.get('action')) {
        case Variables.actions.saved:
          this.add(generalTitle);
          break;
        case Variables.actions.deleted:
          this.delete(generalTitle);
          break;
        case Variables.actions.updated:
          this.update(generalTitle);
          break;
        default:
          console.log('unknown value passed');
      }
    });
  }

  private update(generalTitle: GeneralTitle) {
    this.subscription.add(this.patientTitleService.edit(generalTitle).subscribe(
      result => {
        if (result > 0) {
          const index = this.dataSource.findIndex(it => it.id === generalTitle.id);
          this.dataSource[index].title = generalTitle.title;
        }
      },
      error => {
        console.error(error);
      }
    ));
  }

  private delete(generalTitle: GeneralTitle) {
    this.subscription.add(this.patientTitleService.delete(generalTitle).subscribe(
      result => {
        if (result > 0) {
          this.dataSource = this.dataSource.filter(it => it.id !== generalTitle.id);
        }
      },
      error => {
        console.log(error);
      }
    ));
  }

  private add(generalTitle: GeneralTitle) {
    this.subscription.add(this.patientTitleService.save(generalTitle).subscribe(
      result => {
        this.dataSource.push(result);
      }, error => {
        console.error(error);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
