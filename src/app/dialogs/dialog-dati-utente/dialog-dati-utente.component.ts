import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogDatiOperatoreComponent } from '../dialog-dati-operatore/dialog-dati-operatore.component';
import { UtenteDto } from 'src/app/dto/utente-dto';
import { DialogsService } from '../dialogs.service';
import { UtenteService } from 'src/app/services/utente.service';
import { UserService } from 'src/app/security/user.service';
import { usernameStrictlyValidator } from 'src/app/validators/username-strictly.validator';

export interface DialogDatiUtenteData {
  gruppoVuoto: boolean;
  utente: UtenteDto;
}

@Component({
  selector: 'app-dialog-dati-utente',
  templateUrl: './dialog-dati-utente.component.html',
  styleUrls: ['../dialogs.component.scss', './dialog-dati-utente.component.scss']
})
export class DialogDatiUtenteComponent {

  formUtente: FormGroup;

  hide: boolean = true;
  editMode: boolean = false;

  id: number | null;
  username: string;

  constructor(private dialogRef: MatDialogRef<DialogDatiOperatoreComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDatiUtenteData,
    private formBuilder: FormBuilder, private location: Location, private dialogsService: DialogsService,
    private userService: UserService, private utenteService: UtenteService) {
    let utente = data?.utente;
    this.editMode = (utente !== undefined) && (utente !== null);
    this.id = utente && utente.id ? utente.id : null;
    this.username = utente && utente.username ? utente.username : '';
    let password = utente && utente.password ? utente.password : '';
    let facilitato = utente && utente.facilitato ? utente.facilitato : false;
    this.formUtente = this.formBuilder.group({
      id: [this.id],
      username: [this.username, {
        validators: [Validators.required, Validators.minLength(4), usernameStrictlyValidator]
      }],
      facilitato: [facilitato],
      password: [this.editMode ? password : '', {
        validators: [Validators.required, Validators.minLength(4)]
      }]
    });
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  testError(control: string, error: string): boolean {
    let ctrl = this.formUtente.controls[control];
    return (ctrl.touched && ctrl.errors && ctrl.errors[error]);
  }

  deleteUtente(): void {
    if (this.editMode && this.id && this.username) {
      this.dialogsService.askDeleteConfirmation("Eliminazione utente " + this.username, "Sei sicuro di volerlo fare?").then(confirmed => {
        if (confirmed) {
          this.utenteService.deleteUtente(this.id!).subscribe({
            next: () => {
              this.location.back();
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
    if (this.formUtente.valid) {
      this.dialogRef.close(this.formUtente.value);
    }
  }

}
