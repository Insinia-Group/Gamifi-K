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
@NgModule({
  declarations: [
    
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
   
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
