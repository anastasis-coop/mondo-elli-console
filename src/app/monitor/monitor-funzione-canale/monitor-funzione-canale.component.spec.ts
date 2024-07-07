import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorFunzioneCanaleComponent } from './monitor-funzione-canale.component';

describe('MonitorFunzioneCanaleComponent', () => {
  let component: MonitorFunzioneCanaleComponent;
  let fixture: ComponentFixture<MonitorFunzioneCanaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorFunzioneCanaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorFunzioneCanaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
