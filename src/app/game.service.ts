import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentGame = this.socket.fromEvent<any>('game'); // refers to the game that the server sent. When the server fires the game event, client can receives the data as an Observable
  games = this.socket.fromEvent<string[]>('games');
  constructor(private socket: Socket) { }

  getGame(gameId: string): void {
    this.socket.emit('getGame', gameId);
  }

  newGame(): void {
    this.socket.emit('addGame');
  }

  joinGame(gameId: string, playerName: string): void {
    this.socket.emit('joinGame', {gameId, playerName});
  }

  playGame(gameId: string , playerName: string, x: number, y: number): void {
    this.socket.emit('playGame', {gameId, playerName, x, y});
  }
}
