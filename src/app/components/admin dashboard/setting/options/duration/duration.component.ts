import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {AddComponent} from '../add/add.component';
import {DurationService} from '../../../../../services/Duration/duration.service';
import {SettingDialogData} from '../../../../../utility/settingDialogData';
import {Duration} from '../../../../../models/Duration';
import {Variables} from '../../../../../utility/variables';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['../patient-title/patient-title.component.css']
})
export class DurationComponent implements OnInit, OnDestroy {

  dataSource: Duration[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private durationService: DurationService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscription.add(this.durationService.get().subscribe(
      result => {
        this.dataSource.push(...result);
      },
      error => {
        console.error(error);
      }
    ));
  }

  addClicked() {
    this.openDialogWith(SettingDialogData.prepare('Duration'));
  }

  itemClicked(duration: Duration) {
    this.openDialogWith(SettingDialogData.prepare('Duration', duration.id,
      duration.duration));
  }

  private openDialogWith(title: Map<string, string>) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: Variables.dialogSmallWidth,
      data: title
    });

    dialogRef.afterClosed().subscribe(result => {
      const duration = new Duration();
      duration.duration = Number(result.get('value'));
      duration.id = result.get('id');
      switch (result.get('action')) {
        case Variables.actions.saved:
          this.add(duration);
          break;
        case Variables.actions.deleted:
          this.delete(duration);
          break;
        case Variables.actions.updated:
          this.update(duration);
          break;
        default:
          console.log('unknown value passed');
      }
    });
  }

  private update(duration: Duration) {
    this.subscription.add(this.durationService.edit(duration).subscribe(
      result => {
        if (result > 0) {
          const index = this.dataSource.findIndex(it => it.id === duration.id);
          this.dataSource[index].duration = duration.duration;
        }
      },
      error => {
        console.error(error);
      }
    ));
  }

  private delete(duration: Duration) {
    this.subscription.add(this.durationService.delete(duration).subscribe(
      result => {
        if (result > 0) {
          this.dataSource = this.dataSource.filter(it => it.id !== duration.id);
        }
      },
      error => {
        console.log(error);
      }
    ));
  }

  private add(duration: Duration) {
    this.subscription.add(this.durationService.save(duration).subscribe(
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
