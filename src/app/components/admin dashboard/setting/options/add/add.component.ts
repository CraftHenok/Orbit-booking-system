import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

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
    this.data.set('action', 'A');
    this.dialogRef.close(this.data);
  }

  delete() {
    this.data.set('action', 'D');
    this.dialogRef.close(this.data);
  }

  update() {
    this.data.set('value', this.value);
    this.data.set('action', 'U');
    this.dialogRef.close(this.data);
  }
}
