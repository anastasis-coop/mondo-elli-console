import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['../../gestione.component.scss', './accordion.component.scss']
})
export class AccordionComponent {

  @Input() title: string = '';
  @Input() subject: string = '';

  expanded: boolean = false;

}
