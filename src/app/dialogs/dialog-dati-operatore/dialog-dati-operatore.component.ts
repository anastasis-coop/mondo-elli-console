import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OperatoreDto } from 'src/app/dto/operatore-dto';
import { AccountDuplicatoValidator } from 'src/app/validators/account-duplicato.validator';
import { asyncConditionalValidator } from 'src/app/validators/async-conditional.validator';
import { emailStrictlyValidator } from 'src/app/validators/email-strictly.validator';
import { DialogsService } from '../dialogs.service';
import { OperatoreService } from 'src/app/services/operatore.service';

@Component({
  selector: 'app-dialog-dati-operatore',
  templateUrl: './dialog-dati-operatore.component.html',
  styleUrls: ['../dialogs.component.scss', './dialog-dati-operatore.component.scss']
})
export class DialogDatiOperatoreComponent {

  formOperatore: FormGroup;

  editMode: boolean = false;

  id: number | null;
  username: string;

  constructor(private dialogRef: MatDialogRef<DialogDatiOperatoreComponent>, @Inject(MAT_DIALOG_DATA) private data: OperatoreDto,
    private formBuilder: FormBuilder, private accountDuplicatoValidator: AccountDuplicatoValidator,
    private operatoreService: OperatoreService, private dialogsService: DialogsService) {
    let operatore: OperatoreDto | null = this.data ? this.data : null;
    this.editMode = (operatore !== undefined) && (operatore !== null);
    this.id = operatore && operatore.id ? operatore.id : null;
    this.username = operatore && operatore.username ? operatore.username : '';
    let nome = operatore && operatore.nome ? operatore.nome : '';
    let cognome = operatore && operatore.cognome ? operatore.cognome : '';
    let referente = operatore ? operatore && (operatore.referente === true) : false;
    this.formOperatore = this.formBuilder.group({
      id: [this.id],
      username: [this.username, {
        asyncValidators: asyncConditionalValidator(
          () => this.hasChanged(),
          this.accountDuplicatoValidator.validate.bind(this.accountDuplicatoValidator)
        ),
        validators: [Validators.required, emailStrictlyValidator],
        updateOn: 'blur'
      }],
      nome: [nome, Validators.required],
      cognome: [cognome, Validators.required],
      referente: [referente, Validators.required]
    });
  }

  hasChanged(): boolean {
    if (this.editMode) {
      if (this.formOperatore) {
        return this.formOperatore.controls['username'].value != this.username;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  testError(control: string, error: string): boolean {
    let ctrl = this.formOperatore.controls[control];
    return (ctrl.touched && ctrl.errors && ctrl.errors[error]);
  }

  deleteOperatore(): void {
    if (this.editMode && this.id && this.username) {
      this.dialogsService.askDeleteConfirmation("Eliminazione operatore " + this.username, "Sei sicuro di volerlo fare?").then(confirmed => {
        if (confirmed) {
          this.operatoreService.deleteOperatore(this.id!).subscribe({
            next: () => {
              this.dialogRef.close();
            },
            error: error => {
              this.dialogsService.showAlert("Eliminazione fallita", "Si è verificato un errore durante l'operazione");
              console.error(error);
            }
          });
        }
      });
    }
  }

  public confirm(): void {
    if (!this.formOperatore.invalid) {
      this.dialogRef.close(this.formOperatore.value);
    }
  }

}
