import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QueryUtenteDto } from '../../dto/query-utente-dto';

@Component({
  selector: 'app-search-utenti',
  templateUrl: './search-utenti.component.html',
  styleUrls: ['../search.component.scss']
})
export class SearchUtentiComponent {

  formUtente: FormGroup;

  @Input() showPulisci: boolean = false;

  @Output() onCerca: EventEmitter<QueryUtenteDto> = new EventEmitter<QueryUtenteDto>();
  @Output() onPulisci: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {
    this.formUtente = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      username: ['']
    });
  }

  cerca(): void {
    if (this.formUtente.valid) {
      let dto: QueryUtenteDto = {
        id: this.formUtente.controls['id'].value,
        username: this.formUtente.controls['username'].value.trim()
      }
      this.onCerca.emit(dto);
    }
  }

  pulisci(): void {
    this.formUtente = this.createForm();
    this.onPulisci.emit();
  }

  @HostListener('keypress', ['$event'])
  keypress(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.cerca();
    }
  }

}
