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
import { NotFoundComponent } from './not-found/not-found.component';
import { UserPageComponent } from './user-page/user-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { TokenInterceptor } from './interceptors/token-interceptor.interceptor';
import { UserRankingComponent } from './user-ranking/user-ranking.component';
import { AgGridModule } from 'ag-grid-angular';
import { LoadingComponent } from './components/loading/loading.component';
import { LogoComponent } from './components/logo/logo.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SwiperModule } from 'swiper/angular';
import { NotifierModule } from 'angular-notifier';
import { NotifierConfiguration } from './config/notifier.config';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { MoodRendererComponent } from './ag-grid/mood-renderer/mood-renderer.component';
import { GenderRendererComponent } from './ag-grid/gender-renderer/gender-renderer.component';
import { ModalComponent } from './components/modal/modal.component';
import { HistorialComponent } from './historial/historial.component';
import { AddRankingComponent } from './add-ranking/add-ranking.component';
import { ValidatorErrorComponent } from './components/validator-error/validator-error.component';
import { UserRankingDevComponent } from './user-ranking-dev/user-ranking-dev.component';

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
    LoadingComponent,
    LogoComponent,
    NavbarComponent,
    MoodRendererComponent,
    GenderRendererComponent,
    ModalComponent,
    HistorialComponent,
    AddRankingComponent,
    ValidatorErrorComponent,
    UserRankingDevComponent
  ],
  imports: [
    NotifierModule.withConfig(NotifierConfiguration),
    MatTableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    AgGridModule.withComponents([GenderRendererComponent, MoodRendererComponent]),
    SwiperModule,
    NgxTippyModule,
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
