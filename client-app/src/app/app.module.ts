import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { SharedModule } from './shared/shared.module';
import {
  AuthModule,
  OidcConfigService,
  LogLevel,
} from 'angular-auth-oidc-client';
import { CookieManagerService } from './shared/services/cookie-manager.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { MainAppComponent } from './main-app/main-app.component';
import { RegisterComponent } from './register/register.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DashBoardComponent } from './dash-board/dash-board.component';

export function configureAuth(oidcConfigService: OidcConfigService) {
  return () =>
    oidcConfigService.withConfig({
      stsServer: 'https://localhost:44300', //Identity server port
      redirectUrl: window.location.origin,
      postLogoutRedirectUri: window.origin,
      clientId: 'angular_spa',
      scope: 'openid profile offline_access',
      responseType: 'code',
      silentRenew: true,
      useRefreshToken: true,
      renewTimeBeforeTokenExpiresInSeconds: 10,
      logLevel: LogLevel.Debug,
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutComponent,
    HomeComponent,
    MainAppComponent,
    RegisterComponent,
    DashBoardComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    AuthModule.forRoot({ storage: CookieManagerService }),
    SharedModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
