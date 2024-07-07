import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { RequiredRoleOperatorGuard } from '../security/required-role-operator.guard';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  { path: '', redirectTo: 'percorsi', pathMatch: 'full' },
  { path: 'privacy', component: PrivacyComponent, canActivate: [RequiredRoleOperatorGuard] },
  { path: 'percorsi', component: HomeComponent, canActivate: [RequiredRoleOperatorGuard] },
  { path: 'archivio', component: HomeComponent, canActivate: [RequiredRoleOperatorGuard] },
  { path: 'archivio/:id', component: HomeComponent, canActivate: [RequiredRoleOperatorGuard] },
  { path: 'centro', component: HomeComponent, canActivate: [RequiredRoleOperatorGuard] },
  { path: 'percorsi/:id', component: HomeComponent, canActivate: [RequiredRoleOperatorGuard] },
  { path: 'centro/percorsi/:id', component: HomeComponent, canActivate: [RequiredRoleOperatorGuard] },
  { path: 'materiali', component: HomeComponent, canActivate: [RequiredRoleOperatorGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
