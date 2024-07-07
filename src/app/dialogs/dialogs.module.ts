import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogAlertComponent } from './dialog-alert/dialog-alert.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DialogsService } from './dialogs.service';
import { MatSelectModule } from '@angular/material/select';
import { ComponentsModule } from '../components/components.module';
import { DialogConfirmDeleteComponent } from './dialog-confirm-delete/dialog-confirm-delete.component';
import { DialogDatiCentroComponent } from './dialog-dati-centro/dialog-dati-centro.component';
import { DialogDatiPercorsoComponent } from './dialog-dati-percorso/dialog-dati-percorso.component';
import { DialogDatiOperatoreComponent } from './dialog-dati-operatore/dialog-dati-operatore.component';
import { DialogDatiUtenteComponent } from './dialog-dati-utente/dialog-dati-utente.component';
import { DialogSceltaOperatoriComponent } from './dialog-scelta-operatori/dialog-scelta-operatori.component';
import { DialogSceltaPercorsiComponent } from './dialog-scelta-percorsi/dialog-scelta-percorsi.component';
import { DialogSerieUtentiComponent } from './dialog-serie-utenti/dialog-serie-utenti.component';
import { DialogCambioEmailComponent } from './dialog-cambio-email/dialog-cambio-email.component';
import { DialogDatiProfiloComponent } from './dialog-dati-profilo/dialog-dati-profilo.component';
import { DialogConfirmComponent } from './dialog-confirm/dialog-confirm.component';

@NgModule({
  declarations: [
    DialogAlertComponent,
    DialogDatiCentroComponent,
    DialogDatiPercorsoComponent,
    DialogDatiOperatoreComponent,
    DialogDatiUtenteComponent,
    DialogSceltaOperatoriComponent,
    DialogSceltaPercorsiComponent,
    DialogSerieUtentiComponent,
    DialogConfirmDeleteComponent,
    DialogCambioEmailComponent,
    DialogDatiProfiloComponent,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule
  ],
  providers: [
    DialogsService
  ]
})
export class DialogsModule { }
