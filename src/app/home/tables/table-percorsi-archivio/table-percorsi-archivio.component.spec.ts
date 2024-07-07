import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePercorsiArchivioComponent } from './table-percorsi-archivio.component';

describe('TablePercorsiArchivioComponent', () => {
  let component: TablePercorsiArchivioComponent;
  let fixture: ComponentFixture<TablePercorsiArchivioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TablePercorsiArchivioComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TablePercorsiArchivioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
