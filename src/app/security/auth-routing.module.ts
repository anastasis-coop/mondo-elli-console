import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RecuperoPasswordComponent } from './recupero-password/recupero-password.component';
import { ImpostaPasswordComponent } from './imposta-password/imposta-password.component';
import { TokenLoginComponent } from './token-login/token-login.component';
import { RequiredRoleOperatorGuard } from './required-role-operator.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'imposta-password', component: ImpostaPasswordComponent, canActivate: [RequiredRoleOperatorGuard] },
  { path: 'recupero-password', component: RecuperoPasswordComponent },
  { path: 'token-login/:token', component: TokenLoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
