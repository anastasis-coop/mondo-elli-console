import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogsService } from '../dialogs.service';
import { usernameStrictlyValidator } from 'src/app/validators/username-strictly.validator';

export interface DialogSerieUtentiData {
  gruppoVuoto: boolean;
}

@Component({
  selector: 'app-dialog-serie-utenti',
  templateUrl: './dialog-serie-utenti.component.html',
  styleUrls: ['../dialogs.component.scss', './dialog-serie-utenti.component.scss']
})
export class DialogSerieUtentiComponent {

  formUtenti: FormGroup;

  hide: boolean = true;

  constructor(private dialogRef: MatDialogRef<DialogSerieUtentiComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogSerieUtentiData,
    private formBuilder: FormBuilder, private dialogsService: DialogsService) {
    this.formUtenti = this.formBuilder.group({
      numeroUtenti: [1, Validators.required],
      prefissoUsername: ['', {
        validators: [Validators.required, Validators.minLength(4), usernameStrictlyValidator]
      }],
      indicePrimoUtente: [1, Validators.required],
      password: ['', {
        validators: [Validators.required, Validators.minLength(4)]
      }]
    });
  }

  testError(control: string, error: string): boolean {
    let ctrl = this.formUtenti.controls[control];
    return (ctrl.touched && ctrl.errors && ctrl.errors[error]);
  }

  public confirm(): void {
    if (!this.formUtenti.invalid) {
      let numeroUtenti = this.formUtenti.value.numeroUtenti;
      if (numeroUtenti > 25) {
        this.dialogsService.askConfirmation('ATTENZIONE', `Verranno creati ${numeroUtenti} utenti.`).then(
          confirm => {
            if (confirm) {
              this.dialogRef.close(this.formUtenti.value);
            }
          },
          error => {
            console.error(error);
          }
        )
      } else {
        this.dialogRef.close(this.formUtenti.value);
      }
    }
  }

}
