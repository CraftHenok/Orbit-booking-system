import {MatSnackBar} from '@angular/material/snack-bar';

export class SnackBarManager {
  constructor(private snackBar: MatSnackBar) {

  }

  show(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }


}
