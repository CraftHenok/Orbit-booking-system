import {Component, OnInit} from '@angular/core';
import {Variables} from '../../../../utility/variables';
import {FormBuilder} from '@angular/forms';
import {AccountService} from '../../../../services/Account/account.service';
import {ReceptionFormManager} from '../../../../utility/receptionFormManager';

@Component({
  selector: 'app-add-reception',
  templateUrl: './add-reception.component.html',
  styleUrls: ['./add-reception.component.css']
})
export class AddReceptionComponent implements OnInit {
  hidePassword = true;
  status = Variables.status;

  receptionFormManager: ReceptionFormManager;

  constructor(private fb: FormBuilder, private accountService: AccountService) {
    this.receptionFormManager = new ReceptionFormManager(fb);
  }

  ngOnInit(): void {
  }

  getAccountFromForm() {
    return this.receptionFormManager.bindToNewReception();
  }

  submit() {
    this.accountService.registerAccount(this.getAccountFromForm()).subscribe(
      result => {
        this.receptionFormManager.receptionForm.reset();
      }, error => {
        console.error(error);
      }
    );
  }
}
