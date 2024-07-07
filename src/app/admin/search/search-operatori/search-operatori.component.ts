import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { QueryOperatoreDto } from '../../dto/query-operatore-dto';

@Component({
  selector: 'app-search-operatori',
  templateUrl: './search-operatori.component.html',
  styleUrls: ['../search.component.scss']
})
export class SearchOperatoriComponent {

  formOperatore: FormGroup;

  @Input() showPulisci: boolean = false;

  @Output() onCerca: EventEmitter<QueryOperatoreDto> = new EventEmitter<QueryOperatoreDto>();
  @Output() onPulisci: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder) {
    this.formOperatore = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      username: [''],
      nome: [''],
      cognome: ['']
    });
  }

  cerca(): void {
    if (this.formOperatore.valid) {
      let dto: QueryOperatoreDto = {
        id: this.formOperatore.controls['id'].value,
        username: this.formOperatore.controls['username'].value.trim(),
        nome: this.formOperatore.controls['nome'].value.trim(),
        cognome: this.formOperatore.controls['cognome'].value.trim(),
      }
      this.onCerca.emit(dto);
    }
  }

  pulisci(): void {
    this.formOperatore = this.createForm();
    this.onPulisci.emit();
  }

  @HostListener('keypress', ['$event'])
  keypress(event: KeyboardEvent) {
    if (event.key == 'Enter') {
      this.cerca();
    }
  }

}
