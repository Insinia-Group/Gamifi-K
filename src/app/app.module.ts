import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AboutComponent } from './about/about.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { jwtConfig } from './config/jwt.config';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserPageComponent } from './user-page/user-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TokenInterceptor } from './interceptors/token-interceptor.interceptor';
import { UserRankingComponent } from './user-ranking/user-ranking.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModeratorPageComponent } from './moderator-page/moderator-page.component';
import { LoadingComponent } from './loading/loading.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    NotFoundComponent,
    UserPageComponent,
    UserRankingComponent,
    ModeratorPageComponent,
    LoadingComponent,
    LogoComponent
  ],
  imports: [
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
