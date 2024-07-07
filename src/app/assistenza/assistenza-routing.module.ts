import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequiredRoleOperatorGuard } from '../security/required-role-operator.guard';
import { AssistenzaComponent } from './assistenza.component';

const routes: Routes = [
  { path: '', component: AssistenzaComponent, canActivate: [RequiredRoleOperatorGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AssistenzaRoutingModule { }
