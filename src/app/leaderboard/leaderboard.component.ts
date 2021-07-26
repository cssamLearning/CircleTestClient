import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginServiceService} from "../login-service.service";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  currentPlayerName: string | any;

  constructor(private router: Router, private loginService: LoginServiceService) {
    if(loginService.currentProfile){
      this.currentPlayerName = loginService.currentProfile.name
    } else {
      this.loginService.logout();
    }
  }

  ngOnInit(): void {
  }

  goGame() {
    this.router.navigate(['/dashboard']);
  }

  goGameBoard() {
    this.router.navigate(['/gameboard']);
  }

  logout(){
    this.loginService.logout();
  }
}
