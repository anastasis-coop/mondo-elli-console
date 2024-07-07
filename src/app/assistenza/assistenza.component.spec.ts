import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistenzaComponent } from './assistenza.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

describe('AssistenzaComponent', () => {
  let component: AssistenzaComponent;
  let fixture: ComponentFixture<AssistenzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ],
      declarations: [
        AssistenzaComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AssistenzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
