import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OperatoreDto } from 'src/app/dto/operatore-dto';

@Component({
  selector: 'app-dialog-dati-profilo',
  templateUrl: './dialog-dati-profilo.component.html',
  styleUrls: ['../dialogs.component.scss', './dialog-dati-profilo.component.scss']
})
export class DialogDatiProfiloComponent {

  formProfilo: FormGroup;

  constructor(private dialogRef: MatDialogRef<DialogDatiProfiloComponent>, @Inject(MAT_DIALOG_DATA) private data: OperatoreDto,
    private formBuilder: FormBuilder) {
    let operatore: OperatoreDto | null = this.data ? this.data : null;
    let id = operatore && operatore.id ? operatore.id : null;
    let username = operatore && operatore.username ? operatore.username : '';
    let nome = operatore && operatore.nome ? operatore.nome : '';
    let cognome = operatore && operatore.cognome ? operatore.cognome : '';
    let referente = operatore ? operatore && (operatore.referente === true) : false;
    this.formProfilo = this.formBuilder.group({
      id,
      username,
      nome: [nome, Validators.required],
      cognome: [cognome, Validators.required],
      referente
    });
  }

  public confirm(): void {
    if (!this.formProfilo.invalid) {
      this.dialogRef.close(this.formProfilo.value);
    }
  }

}
