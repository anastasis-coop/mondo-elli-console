import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { ComponentsModule } from '../components/components.module';
import { DialogsModule } from '../dialogs/dialogs.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { GestioneCentroComponent } from './gestione/gestione-centro/gestione-centro.component';
import { TableOperatoriComponent } from './tables/table-operatori/table-operatori.component';
import { TablePercorsiComponent } from './tables/table-percorsi/table-percorsi.component';
import { TableUtentiComponent } from './tables/table-utenti/table-utenti.component';
import { TablePercorsiOperatoreComponent } from './tables/table-percorsi-operatore/table-percorsi-operatore.component';
import { GestionePercorsoComponent } from './gestione/gestione-percorso/gestione-percorso.component';
import { GestionePercorsiComponent } from './gestione/gestione-percorsi/gestione-percorsi.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { GestioneArchivioComponent } from './gestione/gestione-archivio/gestione-archivio.component';
import { TablePercorsiArchivioComponent } from './tables/table-percorsi-archivio/table-percorsi-archivio.component';
import { AccordionComponent } from './gestione/gestione-centro/accordion/accordion.component';
import { MaterialiComponent } from './gestione/materiali/materiali.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HomeComponent,
    AccordionComponent,
    GestioneCentroComponent,
    GestionePercorsiComponent,
    GestioneArchivioComponent,
    GestionePercorsoComponent,
    TableOperatoriComponent,
    TablePercorsiComponent,
    TableUtentiComponent,
    TablePercorsiOperatoreComponent,
    TablePercorsiArchivioComponent,
    MaterialiComponent,
    PrivacyComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DialogsModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class HomeModule { }
