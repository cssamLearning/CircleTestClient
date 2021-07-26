import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {LoginServiceService} from "../login-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  _gameSub: Subscription = new Subscription;
  game: any;
  gameId: string | any;
  currentPlayerName: string | any;
  winner: any;
  currentGameId: string | undefined;
  games: Observable<string[]> | undefined;

  constructor(private loginService: LoginServiceService, private router: Router, private gameService: GameService) {
    if(loginService.currentProfile){
      this.currentPlayerName = loginService.currentProfile.name
    } else {
      this.loginService.logout();
    }
    this.games = this.gameService.games
  }

  ngOnInit(): void {
    this._gameSub = this.gameService.currentGame.subscribe(game => {
      this.game = game;
      this.gameId = Object.keys(game)[0];
      this.currentGameId = Object.keys(game)[0];

      if(this.game[this.gameId].players.length == 0){
        this.joinGame()
      }


      const winIndex = this.checkStateForWin(this.game[this.gameId].state);

      if (winIndex) {
        if (this.game[this.gameId].state[winIndex[0]][winIndex[1]] === 1) {
          this.winner = this.game[this.gameId].players[0];
        } else if (this.game[this.gameId].state[winIndex[0]][winIndex[1]] === -1) {
          this.winner = this.game[this.gameId].players[1];
        }
      } else {
        this.winner = null;
      }
    });
  }

  ngOnDestroy(): void {
    this._gameSub.unsubscribe();
  }

  loadGame(gameId: string): void {
    this.gameService.getGame(gameId);
  }

  newGame(): void {
    this.gameService.newGame();
  }

  setPlayerName(event: any): void {
    this.currentPlayerName = event.target.value;
  }

  joinGame(): void {
    if (this.currentPlayerName) {
      this.gameService.joinGame(this.gameId, this.currentPlayerName);
    }
  }

  playGame(x: number, y: number): void {
    this.gameService.playGame(this.gameId, this.currentPlayerName, x, y);
  }

  checkStateForWin(state: any[][]): any {
    // send pos where win was found
    if (state[0][0] !== 0 && state[0][0] === state[0][1] && state[0][1] === state[0][2]) {
      return [0, 0];
    }
    if (state[1][0] !== 0 && state[1][0] === state[1][1] && state[1][1] === state[1][2]){
      return [1, 0];
    }
    if (state[2][0] !== 0 && state[2][0] === state[2][1] && state[2][1] === state[2][2]){
      return [2, 0];
    }
    if (state[0][0] !== 0 && state[0][0] === state[1][0] && state[1][0] === state[2][0]){
      return [0, 0];
    }
    if (state[0][1] !== 0 && state[0][1] === state[1][1] && state[1][1] === state[2][1]){
      return [0, 1];
    }
    if (state[0][2] !== 0 && state[0][2] === state[1][2] && state[1][2] === state[2][2]){
      return [0, 2];
    }
    if (state[0][0] !== 0 && state[0][0] === state[1][1] && state[1][1] === state[2][2]){
      return [0, 0];
    }
    if (state[0][2] !== 0 && state[0][2] === state[1][1] && state[1][1] === state[2][0]){
      return [0, 2];
    }
    return null;
  }

  home() {
    this.router.navigate(['/leaderboard']);
  }

  logout(){
    this.loginService.logout();
  }
}
