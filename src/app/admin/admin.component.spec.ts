import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { ComponentsModule } from '../components/components.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminTableCentriComponent } from './tables/admin-table-centri/admin-table-centri.component';
import { AdminTableOperatoriComponent } from './tables/admin-table-operatori/admin-table-operatori.component';
import { AdminTableUtentiComponent } from './tables/admin-table-utenti/admin-table-utenti.component';
import { SearchCentriComponent } from './search/search-centri/search-centri.component';
import { SearchOperatoriComponent } from './search/search-operatori/search-operatori.component';
import { SearchUtentiComponent } from './search/search-utenti/search-utenti.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ComponentsModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        NoopAnimationsModule
      ],
      declarations: [
        AdminComponent,
        SearchCentriComponent,
        SearchOperatoriComponent,
        SearchUtentiComponent,
        AdminTableCentriComponent,
        AdminTableOperatoriComponent,
        AdminTableUtentiComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
