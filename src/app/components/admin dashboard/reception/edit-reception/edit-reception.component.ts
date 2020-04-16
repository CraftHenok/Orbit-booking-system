import {Component, OnInit} from '@angular/core';
import {Variables} from '../../../../utility/variables';
import {FormBuilder} from '@angular/forms';
import {AccountService} from '../../../../services/Account/account.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ReceptionFormManager} from '../../../../utility/receptionFormManager';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarManager} from '../../../../utility/snackBarManager';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-reception',
  templateUrl: './edit-reception.component.html',
  styleUrls: ['../add-reception/add-reception.component.css']
})
export class EditReceptionComponent implements OnInit {

  hidePassword = true;
  status = Variables.status;
  private snackBarMan: SnackBarManager;
  receptionFormManager: ReceptionFormManager;
  error: string;

  constructor(private fb: FormBuilder,
              private accountService: AccountService,
              private snackBar: MatSnackBar,
              private location: Location,
              private activatedRoute: ActivatedRoute) {
    this.receptionFormManager = new ReceptionFormManager(fb);
    this.snackBarMan = new SnackBarManager(this.snackBar);
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(switchMap(params => {
      return this.accountService.getAccountById(Number(params.get('id')));
    })).subscribe(result => {
      this.receptionFormManager.updateForm(result);
    }, error => {
      console.error(error);
    });
  }

  getEditReceptionFormData() {
    return this.receptionFormManager.bindToNewReception();
  }

  submit() {
    const accountToUpdate = this.getEditReceptionFormData();
    accountToUpdate.id = Number(this.activatedRoute.snapshot.params.id);

    this.accountService.updateAccountInfoById(accountToUpdate).subscribe(
      result => {
        if (result > 0) {
          this.snackBarMan.show('Reception updated', 'ok');
        }
        this.location.back();
      },
      error => {
        this.error = error.error;
        console.error(error);
      });

  }
}
