import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelinePercorsoComponent } from './timeline-percorso.component';
import { MatSliderModule } from '@angular/material/slider';
import { AgendaPercorsoComponent } from '../agenda-percorso/agenda-percorso.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

describe('TimelinePercorsoComponent', () => {
  let component: TimelinePercorsoComponent;
  let fixture: ComponentFixture<TimelinePercorsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatButtonToggleModule,
        MatSliderModule
      ],
      declarations: [
        TimelinePercorsoComponent,
        AgendaPercorsoComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimelinePercorsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
