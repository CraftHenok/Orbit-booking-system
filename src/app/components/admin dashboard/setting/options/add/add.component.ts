import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Variables} from '../../../../../utility/variables';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  value: string;

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Map<string, string>) {
  }

  ngOnInit(): void {
    this.value = this.data.get('value');
  }

  add() {
    this.data.set('value', this.value);
    this.data.set('action', Variables.actions.saved);
    this.dialogRef.close(this.data);
  }

  delete() {
    this.data.set('action', Variables.actions.deleted);
    this.dialogRef.close(this.data);
  }

  update() {
    this.data.set('value', this.value);
    this.data.set('action', Variables.actions.updated);
    this.dialogRef.close(this.data);
  }
}
