import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorSessioniComponent } from './monitor-sessioni.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingComponent } from 'src/app/components/loading/loading.component';

describe('MonitorSessioniComponent', () => {
  let component: MonitorSessioniComponent;
  let fixture: ComponentFixture<MonitorSessioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        MonitorSessioniComponent,
        LoadingComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorSessioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
