import {Component, OnInit} from '@angular/core';
import {Variables} from '../../../../utility/variables';
import {FormBuilder} from '@angular/forms';
import {AccountService} from '../../../../services/Account/account.service';
import {ReceptionFormManager} from '../../../../utility/receptionFormManager';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxSpinnerService} from 'ngx-spinner';
import {SnackBarManager} from '../../../../utility/snackBarManager';

@Component({
  selector: 'app-add-reception',
  templateUrl: './add-reception.component.html',
  styleUrls: ['./add-reception.component.css']
})
export class AddReceptionComponent implements OnInit {
  hidePassword = true;
  status = Variables.status;
  private snackBarMan: SnackBarManager;
  receptionFormManager: ReceptionFormManager;
  error: string;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private accountService: AccountService) {
    this.receptionFormManager = new ReceptionFormManager(fb);
  }

  ngOnInit(): void {
    this.snackBarMan = new SnackBarManager(this.snackBar);
  }

  getAccountFromForm() {
    return this.receptionFormManager.bindToNewReception();
  }

  submit() {

    this.accountService.registerAccount(this.getAccountFromForm()).subscribe(
      result => {
        this.snackBarMan.show('New Reception added', 'Ok');
        this.receptionFormManager.receptionForm.reset();

      }, error => {
        this.error = error.error;
        console.error(error);
      }
    );
  }
}
