import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LeaderboardComponent} from "./leaderboard/leaderboard.component";

import {LoginComponent} from "./login/login.component";

const routes: Routes = [
  {path:'dashboard', component:DashboardComponent},
  {path:'leaderboard' , component:LeaderboardComponent},
  {path:'login', component:LoginComponent}
]

@NgModule({
  imports: [RouterModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
