import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequiredRoleOperatorGuard } from '../security/required-role-operator.guard';
import { MonitorComponent } from './monitor.component';

const routes: Routes = [
  { path: ':idUtente', component: MonitorComponent, canActivate: [RequiredRoleOperatorGuard] },
  { path: 'archivio/:idUtente', component: MonitorComponent, canActivate: [RequiredRoleOperatorGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
