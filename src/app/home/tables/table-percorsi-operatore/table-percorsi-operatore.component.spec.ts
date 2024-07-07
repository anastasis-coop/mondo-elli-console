import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePercorsiOperatoreComponent } from './table-percorsi-operatore.component';

describe('TablePercorsiOperatoreComponent', () => {
  let component: TablePercorsiOperatoreComponent;
  let fixture: ComponentFixture<TablePercorsiOperatoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablePercorsiOperatoreComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TablePercorsiOperatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
