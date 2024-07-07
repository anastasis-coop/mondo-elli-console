import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { CentroDto } from 'src/app/dto/centro-dto';
import { PercorsoDto } from 'src/app/dto/percorso-dto';

export interface DialogSceltaPercorsiData {
  centro: CentroDto,
  percorsiOperatore: number[];
  percorsiCentro: PercorsoDto[];
}

@Component({
  selector: 'app-dialog-scelta-percorsi',
  templateUrl: './dialog-scelta-percorsi.component.html',
  styleUrls: ['../dialogs.component.scss', './dialog-scelta-percorsi.component.scss']
})
export class DialogSceltaPercorsiComponent {

  constructor(private dialogRef: MatDialogRef<DialogSceltaPercorsiComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSceltaPercorsiData) { }

  listChanged(event: MatSelectionListChange) {
    this.data.percorsiOperatore = [];
    event.source.selectedOptions.selected.forEach(option => {
      this.data.percorsiOperatore.push(option.value);
    });
  }

  getDescrizioneTipo(tipo: string) {
    switch (tipo) {
      case 'GRUPPO': return 'Gruppo';
      case 'SINGOLO': return 'Individuale';
      default: return '';
    }
  }

  confirm(): void {
    this.dialogRef.close(this.data.percorsiOperatore);
  }

}
