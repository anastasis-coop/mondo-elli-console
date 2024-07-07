import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequiredRoleOperatorGuard } from '../security/required-role-operator.guard';
import { ProfiloComponent } from './profilo.component';

const routes: Routes = [
  { path: '', component: ProfiloComponent, canActivate: [RequiredRoleOperatorGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class ProfiloRoutingModule { }
