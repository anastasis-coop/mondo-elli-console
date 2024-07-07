import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoContentComponent } from './no-content/no-content.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' }, // Default
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('./security/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'monitor', loadChildren: () => import('./monitor/monitor.module').then(m => m.MonitorModule) },
  { path: 'profilo', loadChildren: () => import('./profilo/profilo.module').then(m => m.ProfiloModule) },
  { path: 'assistenza', loadChildren: () => import('./assistenza/assistenza.module').then(m => m.AssistenzaModule) },
  { path: '**', component: NoContentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
