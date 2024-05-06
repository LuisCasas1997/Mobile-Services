import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GenericDialogComponent } from './generic-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class GenericDialogService {

  constructor(
    private _matDialog: MatDialog
  ) { }

  openDialog(componentDialog: any, title: String, data: any, disableClose: boolean = false, panelClass: string = "", icon?: string, subtitle?: string): MatDialogRef<any> {
    let panelNameClass: string[] = ['generic-dialog-container'];
    if (panelClass.length) {
      panelNameClass.push(panelClass);
    }

    const dialogRef = this._matDialog
      .open(
        GenericDialogComponent
        , {
          data:
          {
            component: componentDialog
            , title: title
            , data: data
            , icon: icon
            , subtitle: subtitle
          }
          , disableClose: disableClose
          , panelClass: panelNameClass
        }
      );
    return dialogRef;
  }

}
