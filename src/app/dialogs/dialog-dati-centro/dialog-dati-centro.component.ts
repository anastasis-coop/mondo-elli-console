import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CentroDto } from 'src/app/dto/centro-dto';
import { UserService } from 'src/app/security/user.service';
import { IstatService, ComuneDisplayValueFn } from 'src/app/services/istat.service';
import { DialogsService } from '../dialogs.service';
import { CentroService } from 'src/app/services/centro.service';
import { Location } from '@angular/common';
import { asyncConditionalValidator } from 'src/app/validators/async-conditional.validator';
import { CodiceDuplicatoValidator } from 'src/app/validators/codice-duplicato.validator';

@Component({
  selector: 'app-dialog-dati-centro',
  templateUrl: './dialog-dati-centro.component.html',
  styleUrls: ['../dialogs.component.scss', './dialog-dati-centro.component.scss']
})
export class DialogDatiCentroComponent {

  formCentro: FormGroup;

  editMode: boolean = false;

  comuni$: Observable<any[]> | undefined;

  comuneDisplayValueFn = ComuneDisplayValueFn;

  id: number | null;
  nome: string;
  codice: string;

  constructor(private dialogRef: MatDialogRef<DialogDatiCentroComponent>, @Inject(MAT_DIALOG_DATA) private data: CentroDto,
    private formBuilder: FormBuilder, private codiceDuplicatoValidator: CodiceDuplicatoValidator, private location: Location,
    private userService: UserService, private dialogsService: DialogsService,
    private istatService: IstatService, private centroService: CentroService) {
    this.editMode = (this.data !== undefined) && (this.data !== null);
    this.id = this.data && this.data.id ? this.data.id : null;
    this.nome = this.data && this.data.nome ? this.data.nome : '';
    this.codice = this.data && this.data.codice ? this.data.codice : '';
    this.formCentro = this.formBuilder.group({
      id: [this.id],
      nome: [this.nome, Validators.required],
      codice: [this.codice, {
        asyncValidators: asyncConditionalValidator(
          () => this.hasChanged(),
          this.codiceDuplicatoValidator.validate.bind(this.codiceDuplicatoValidator)
        ),
        validators: [Validators.required],
        updateOn: 'blur'
      }],
      comune: [this.data && this.data.comune ? this.data.comune : '', Validators.required],
    });
    this.comuni$ = this.istatService.setupComuneAutocomplete(this.formCentro.get('comune'));
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  hasChanged(): boolean {
    if (this.editMode) {
      if (this.formCentro) {
        return this.formCentro.controls['codice'].value != this.codice;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  testError(control: string, error: string): boolean {
    let ctrl = this.formCentro.controls[control];
    return (ctrl.touched && ctrl.errors && ctrl.errors[error]);
  }

  deleteCentro(): void {
    if (this.editMode && this.id && this.nome) {
      this.dialogsService.askDeleteConfirmation("Eliminazione centro " + this.nome, "Sei sicuro di volerlo fare?").then(confirmed => {
        if (confirmed) {
          this.centroService.deleteCentro(this.id!).subscribe({
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
    if (!this.formCentro.invalid) {
      this.dialogRef.close(this.formCentro.value);
    }
  }

}
