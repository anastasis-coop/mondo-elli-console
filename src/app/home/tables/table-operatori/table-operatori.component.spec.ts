import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOperatoriComponent } from './table-operatori.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TableOperatoriComponent', () => {
  let component: TableOperatoriComponent;
  let fixture: ComponentFixture<TableOperatoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        TableOperatoriComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableOperatoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
