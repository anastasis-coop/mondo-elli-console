import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistenzaComponent } from './assistenza.component';
import { AssistenzaRoutingModule } from './assistenza-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AssistenzaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    AssistenzaRoutingModule
  ]
})
export class AssistenzaModule { }
