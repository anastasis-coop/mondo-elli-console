import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogAlertData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-dialog-alert',
  templateUrl: './dialog-alert.component.html',
  styleUrls: ['../dialogs.component.scss', './dialog-alert.component.scss']
})
export class DialogAlertComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogAlertData) { }
}
