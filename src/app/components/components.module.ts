import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSliderModule } from '@angular/material/slider';
import { InputAutocompleteComponent } from './input-autocomplete/input-autocomplete.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { TimelinePercorsoComponent } from './timeline-percorso/timeline-percorso.component';
import { AgendaPercorsoComponent } from './agenda-percorso/agenda-percorso.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CoverComponent } from './cover/cover.component';

@NgModule({
  declarations: [
    CoverComponent,
    HeaderComponent,
    SidebarComponent,
    InputAutocompleteComponent,
    TimelinePercorsoComponent,
    AgendaPercorsoComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatSliderModule
  ],
  exports: [
    CoverComponent,
    HeaderComponent,
    SidebarComponent,
    InputAutocompleteComponent,
    TimelinePercorsoComponent,
    AgendaPercorsoComponent,
    LoadingComponent
  ]
})
export class ComponentsModule { }
