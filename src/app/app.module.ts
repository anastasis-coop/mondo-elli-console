import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserService } from './security/user.service';
import { TokenStorageService } from './security/token-storage.service';
import { authInterceptorProviders } from './security/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NoContentComponent } from './no-content/no-content.component';
import { ComponentsModule } from './components/components.module';

@NgModule({
  declarations: [
    AppComponent,
    NoContentComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HttpClientModule
  ],
  providers: [
    { provide: Window, useValue: window },
    authInterceptorProviders,
    UserService,
    TokenStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
