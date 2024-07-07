import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorEsplorazioneComponent } from './monitor-esplorazione.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

describe('MonitorEsplorazioneComponent', () => {
  let component: MonitorEsplorazioneComponent;
  let fixture: ComponentFixture<MonitorEsplorazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        MonitorEsplorazioneComponent,
        LoadingComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorEsplorazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
