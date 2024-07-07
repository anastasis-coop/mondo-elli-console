import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DEFAULT_GIORNI_QUARTIERE } from 'src/app/constants/GIORNI';
import { PercorsoDto } from 'src/app/dto/percorso-dto';
import { DialogsService } from '../dialogs.service';
import { PercorsoService } from 'src/app/services/percorso.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/security/user.service';

export interface DialogPercorsoData {
  tipo: string;
  percorso: PercorsoDto;
}

@Component({
  selector: 'app-dialog-dati-percorso',
  templateUrl: './dialog-dati-percorso.component.html',
  styleUrls: ['../dialogs.component.scss', './dialog-dati-percorso.component.scss']
})
export class DialogDatiPercorsoComponent {

  formPercorso: FormGroup;

  editMode: boolean = false;

  id: number | null;
  nome: string;

  mediaLiteracy: boolean = false;

  constructor(private dialogRef: MatDialogRef<DialogDatiPercorsoComponent>, @Inject(MAT_DIALOG_DATA) data: DialogPercorsoData,
    private formBuilder: FormBuilder, private router: Router, private location: Location,
    private userService: UserService, private percorsoService: PercorsoService,
    private dialogsService: DialogsService) {
    let percorso = data?.percorso;
    let tipo = percorso ? percorso.tipo : data?.tipo;
    this.editMode = (percorso !== undefined) && (percorso !== null);
    this.id = percorso && percorso.id ? percorso.id : null;
    this.nome = percorso && percorso.nome ? percorso.nome : '';
    let inizioPercorso = percorso && percorso.inizioPercorso ? percorso.inizioPercorso.toString().substring(0, 10) : '';
    let inizioPercorsoEffettivo = percorso && percorso.inizioPercorsoEffettivo ? percorso.inizioPercorsoEffettivo : '';
    let durataFunzioneEsecutivaGiorni = percorso && percorso.durataFunzioneEsecutivaGiorni ?
      percorso.durataFunzioneEsecutivaGiorni.toString() : DEFAULT_GIORNI_QUARTIERE.toString();
    let periodoIntroduzione = percorso ? (percorso.periodoIntroduzione === true) : true;
    this.mediaLiteracy = percorso ? (percorso.mediaLiteracy === true) : false;
    this.formPercorso = this.formBuilder.group({
      id: [this.id],
      tipo: [tipo, Validators.required],
      nome: [this.nome, Validators.required],
      inizioPercorso: [inizioPercorso, Validators.required],
      inizioPercorsoEffettivo: [inizioPercorsoEffettivo, Validators.required],
      durataFunzioneEsecutivaGiorni: [durataFunzioneEsecutivaGiorni, Validators.required],
      periodoIntroduzione: [periodoIntroduzione],
      mediaLiteracy: new FormControl({ value: this.mediaLiteracy, disabled: true })
    });
  }

  get isAdmin(): boolean {
    return this.userService.isAdmin;
  }

  get percorso(): PercorsoDto {
    let percorso = this.formPercorso.value;

    // TODO: Solo finché non è abilitata, poi si potrà togliere
    if (percorso.mediaLiteracy === undefined) {
      percorso.mediaLiteracy = this.mediaLiteracy;
    }

    return percorso;
  }

  inputChanged() {
    this.formPercorso.controls['inizioPercorsoEffettivo'].setValue(this.formPercorso.controls['inizioPercorso'].value);
  }

  sliderChanged(nuovoInizioPercorso: Date) {
    this.formPercorso.value.inizioPercorsoEffettivo = nuovoInizioPercorso;
  }

  deletePercorso(): void {
    if (this.editMode && this.id && this.nome) {
      this.dialogsService.askDeleteConfirmation("Eliminazione percorso " + this.nome, "Sei sicuro di volerlo fare?").then(confirmed => {
        if (confirmed) {
          this.percorsoService.deletePercorso(this.id!).subscribe({
            next: () => {
              if (this.router.url == '/home/centro') {
                this.dialogRef.close();
              } else {
                this.location.back();
              }
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
    if (!this.formPercorso.invalid) {
      this.dialogRef.close(this.percorso);
    }
  }

}
