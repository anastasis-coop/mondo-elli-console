import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePercorsiComponent } from './table-percorsi.component';

describe('TablePercorsiComponent', () => {
  let component: TablePercorsiComponent;
  let fixture: ComponentFixture<TablePercorsiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablePercorsiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePercorsiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
