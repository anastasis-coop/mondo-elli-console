import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaPercorsoComponent } from './agenda-percorso.component';

describe('AgendaPercorsoComponent', () => {
  let component: AgendaPercorsoComponent;
  let fixture: ComponentFixture<AgendaPercorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaPercorsoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgendaPercorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
