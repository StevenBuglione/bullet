import { DashBoardComponent } from './dash-board/dash-board.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'info', component: HomeComponent, outlet: 'homepage' },
  { path: 'about', component: AboutComponent, outlet: 'homepage' },
  { path: 'register', component: RegisterComponent, outlet: 'homepage' },
  { path: 'dashboard', component: DashBoardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
