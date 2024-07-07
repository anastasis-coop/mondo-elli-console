import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountDuplicatoValidator } from 'src/app/validators/account-duplicato.validator';
import { asyncConditionalValidator } from 'src/app/validators/async-conditional.validator';
import { emailStrictlyValidator } from 'src/app/validators/email-strictly.validator';
import { DialogsService } from '../dialogs.service';
import { OperatoreService } from 'src/app/services/operatore.service';

@Component({
  selector: 'app-dialog-cambio-email',
  templateUrl: './dialog-cambio-email.component.html',
  styleUrls: ['../dialogs.component.scss', './dialog-cambio-email.component.scss']
})
export class DialogCambioEmailComponent {

  formEmail: FormGroup;

  constructor(private dialogRef: MatDialogRef<DialogCambioEmailComponent>, @Inject(MAT_DIALOG_DATA) private username: string,
    private formBuilder: FormBuilder, private accountDuplicatoValidator: AccountDuplicatoValidator) {
    this.formEmail = this.formBuilder.group({
      username: [this.username, {
        asyncValidators: asyncConditionalValidator(
          () => this.hasChanged(),
          this.accountDuplicatoValidator.validate.bind(this.accountDuplicatoValidator)
        ),
        validators: [Validators.required, emailStrictlyValidator],
        updateOn: 'blur'
      }]
    });
  }

  hasChanged(): boolean {
    if (this.formEmail) {
      return this.formEmail.controls['username'].value != this.username;
    } else {
      return false;
    }
  }

  testError(control: string, error: string): boolean {
    let ctrl = this.formEmail.controls[control];
    return (ctrl.touched && ctrl.errors && ctrl.errors[error]);
  }

  public confirm(): void {
    if (!this.formEmail.invalid) {
      this.dialogRef.close(this.formEmail.value.username);
    }
  }

}
