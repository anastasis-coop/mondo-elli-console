import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface MenuItem {
  icon: string;
  label: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Input() menu: MenuItem[] = [];
  @Input() current: number = 0;

  @Output() selected: EventEmitter<number> = new EventEmitter<number>();

  select(index: number) {
    this.current = index;
    this.selected.emit(index);
  }

}
