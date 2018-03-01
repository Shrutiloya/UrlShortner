import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SocialLoginModule, AuthServiceConfig } from "angular4-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angular4-social-login";
import { HttpClientModule } from '@angular/common/http';
import {DataService} from "./services/data.service";

const routes: Routes = [
{path:'', redirectTo:'/',pathMatch: 'full'},
{path:'',component: AuthComponent},
];

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("524639872840-6u2ci6ke11k5g1aebq5alkqo2hkngluq.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("588008624878391")
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SocialLoginModule,
    HttpClientModule
  ],
  providers: [
  {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    DataService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
