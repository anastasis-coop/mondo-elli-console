import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUtentiComponent } from './table-utenti.component';
import { MatIconModule } from '@angular/material/icon';

describe('TableUtentiComponent', () => {
  let component: TableUtentiComponent;
  let fixture: ComponentFixture<TableUtentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations: [
        TableUtentiComponent

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
