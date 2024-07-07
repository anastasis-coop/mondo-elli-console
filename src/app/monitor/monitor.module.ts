import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MonitorPercorsoComponent } from './monitor-percorso/monitor-percorso.component';
import { MonitorSessioniComponent } from './monitor-sessioni/monitor-sessioni.component';
import { MonitorFunzioneEsecutivaComponent } from './monitor-funzione-esecutiva/monitor-funzione-esecutiva.component';
import { MonitorFunzioneCanaleComponent } from './monitor-funzione-canale/monitor-funzione-canale.component';
import { MatTableModule } from '@angular/material/table';
import { MonitorComponent } from './monitor.component';
import { MonitorEsplorazioneComponent } from './monitor-esplorazione/monitor-esplorazione.component';
import { MatIconModule } from '@angular/material/icon';
import { MonitorRoutingModule } from './monitor-routing.module';
import { ComponentsModule } from '../components/components.module';
import { MonitorQuizComponent } from './monitor-quiz/monitor-quiz.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogsModule } from '../dialogs/dialogs.module';

@NgModule({
  declarations: [
    MonitorComponent,
    MonitorPercorsoComponent,
    MonitorSessioniComponent,
    MonitorEsplorazioneComponent,
    MonitorFunzioneEsecutivaComponent,
    MonitorFunzioneCanaleComponent,
    MonitorQuizComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DialogsModule,
    MonitorRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ]
})
export class MonitorModule { }
