import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RequiredRoleAdminGuard } from '../security/required-role-admin.guard';
import { DettaglioCentroComponent } from './dettaglio/dettaglio-centro/dettaglio-centro.component';
import { DettaglioPercorsoComponent } from './dettaglio/dettaglio-percorso/dettaglio-percorso.component';
import { DettaglioOperatoreComponent } from './dettaglio/dettaglio-operatore/dettaglio-operatore.component';
import { DettaglioUtenteComponent } from './dettaglio/dettaglio-utente/dettaglio-utente.component';

const routes: Routes = [
  { path: '', component: AdminComponent, canActivate: [RequiredRoleAdminGuard] },
  { path: 'centro/:id', component: DettaglioCentroComponent, canActivate: [RequiredRoleAdminGuard] },
  { path: 'percorso/:id', component: DettaglioPercorsoComponent, canActivate: [RequiredRoleAdminGuard] },
  { path: 'operatore/:id', component: DettaglioOperatoreComponent, canActivate: [RequiredRoleAdminGuard] },
  { path: 'utente/:id', component: DettaglioUtenteComponent, canActivate: [RequiredRoleAdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
