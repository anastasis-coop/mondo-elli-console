import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { CentroDto } from 'src/app/dto/centro-dto';
import { OperatoreDto } from 'src/app/dto/operatore-dto';

export interface DialogSceltaOperatoriData {
  centro: CentroDto,
  operatoriPercorso: number[];
  operatoriCentro: OperatoreDto[];
}

@Component({
  selector: 'app-dialog-scelta-operatori',
  templateUrl: './dialog-scelta-operatori.component.html',
  styleUrls: ['../dialogs.component.scss', './dialog-scelta-operatori.component.scss']
})
export class DialogSceltaOperatoriComponent {

  constructor(private dialogRef: MatDialogRef<DialogSceltaOperatoriComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSceltaOperatoriData) { }

  listChanged(event: MatSelectionListChange) {
    this.data.operatoriPercorso = [];
    event.source.selectedOptions.selected.forEach(option => {
      this.data.operatoriPercorso.push(option.value);
    });
  }

  confirm(): void {
    this.dialogRef.close(this.data.operatoriPercorso);
  }

}
