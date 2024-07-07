import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ComponentsModule } from '../components/components.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminTableCentriComponent } from './tables/admin-table-centri/admin-table-centri.component';
import { AdminTableOperatoriComponent } from './tables/admin-table-operatori/admin-table-operatori.component';
import { AdminTableUtentiComponent } from './tables/admin-table-utenti/admin-table-utenti.component';
import { SearchCentriComponent } from './search/search-centri/search-centri.component';
import { SearchOperatoriComponent } from './search/search-operatori/search-operatori.component';
import { SearchUtentiComponent } from './search/search-utenti/search-utenti.component';
import { DettaglioCentroComponent } from './dettaglio/dettaglio-centro/dettaglio-centro.component';
import { DettaglioPercorsoComponent } from './dettaglio/dettaglio-percorso/dettaglio-percorso.component';
import { DettaglioOperatoreComponent } from './dettaglio/dettaglio-operatore/dettaglio-operatore.component';
import { DettaglioUtenteComponent } from './dettaglio/dettaglio-utente/dettaglio-utente.component';
import { DialogsModule } from '../dialogs/dialogs.module';

@NgModule({
  declarations: [
    AdminComponent,
    SearchCentriComponent,
    SearchOperatoriComponent,
    SearchUtentiComponent,
    AdminTableCentriComponent,
    AdminTableOperatoriComponent,
    AdminTableUtentiComponent,
    DettaglioCentroComponent,
    DettaglioPercorsoComponent,
    DettaglioOperatoreComponent,
    DettaglioUtenteComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DialogsModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule
  ]
})
export class AdminModule { }
