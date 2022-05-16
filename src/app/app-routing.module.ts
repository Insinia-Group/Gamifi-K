import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HistorialComponent } from './historial/historial.component';
import { AddRankingComponent } from './add-ranking/add-ranking.component';
import { UserRankingDevComponent } from './user-ranking-dev/user-ranking-dev.component';
import { ChipsComponent } from './chips/chips.component';
import { ProfileComponent } from './profile/profile.component';

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  onSameUrlNavigation: 'ignore',
  scrollPositionRestoration: 'enabled',
};

const routes: Routes = [
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent, pathMatch: 'full' },
  { path: '404', component: NotFoundComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'history', component: HistorialComponent, pathMatch: 'full' },
  { path: 'create', component: AddRankingComponent, pathMatch: 'full' },
  { path: 'chips', component: ChipsComponent, pathMatch: 'full' },
  {
    path: 'rankings',
    component: UserRankingDevComponent,
    pathMatch: 'full',
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
