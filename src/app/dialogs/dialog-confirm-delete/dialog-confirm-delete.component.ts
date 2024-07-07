import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogConfirmDeleteData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-dialog-confirm-delete',
  templateUrl: './dialog-confirm-delete.component.html',
  styleUrls: ['../dialogs.component.scss', './dialog-confirm-delete.component.scss']
})
export class DialogConfirmDeleteComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogConfirmDeleteData) { }
}
