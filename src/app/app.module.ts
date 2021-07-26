import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';
// route
import {AppRoutingModule} from './app-routing.module';

// UI
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

// services
import {GameService} from "./game.service";


const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LeaderboardComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: APP_BASE_HREF,
    useFactory: () =>
      window.location.pathname
        .split('/')
        .slice(0, 2)
        .join('/')
  },
    GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
