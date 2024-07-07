import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfiloComponent } from './profilo.component';
import { ProfiloRoutingModule } from './profilo-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogsModule } from '../dialogs/dialogs.module';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    ProfiloComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    DialogsModule,
    MatIconModule,
    MatButtonModule,
    ProfiloRoutingModule
  ]
})
export class ProfiloModule { }
