import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserProfile} from "./login/userProfile";
import {BehaviorSubject, Observable, throwError} from "rxjs"

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  currentProfile: UserProfile = JSON.parse(<string>localStorage.getItem("userProfile")) as UserProfile;
  constructor(protected cookieService: CookieService, private router: Router) { }

  loginStatus = new BehaviorSubject<boolean>(this.hasToken());

  login(formData: any) {
    this.currentProfile = {name: '', gamePlayed: 0, wins: 0, losses: 0, draws: 0};
    this.currentProfile.name = formData['name']
    this.cookieService.set('currentUser', formData['name']);
    this.loginStatus.next(true);
    return
  }

  isLoggedIn(): Observable<boolean> {
    return this.loginStatus.asObservable();
  }

  logout() {
    this.loginStatus.next(false);
    this.cookieService.deleteAll();
    localStorage.removeItem('userProfile');
    this.router.navigate(['/login']);
  }

  protected handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

  protected hasToken(): boolean {
    return this.cookieService.check('currentUser');
  }
}
