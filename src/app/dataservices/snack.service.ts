import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({ providedIn: "root" })
export class SnackbarService {

    constructor(
        public snackBar: MatSnackBar,
        private zone: NgZone
    ) { }

    public networkAlert(message, action = 'success', duration = 1500) {
        if (message=='Online'){
            this.zone.run(() => {
                this.snackBar.open(message, action, { duration:duration,verticalPosition: 'top',horizontalPosition: 'right', panelClass: ['green-snackbar'],});
            });
        }
        else{
            this.zone.run(() => {
                this.snackBar.open(message, action, { duration:duration,verticalPosition: 'top',horizontalPosition: 'right', panelClass: ['red-snackbar'],});
            });
        }
       
        
    }


    
}