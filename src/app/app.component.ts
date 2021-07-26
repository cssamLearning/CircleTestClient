import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {UserProfile} from "./login/userProfile";
import {LoginServiceService} from "./login-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public currentProfile: UserProfile | undefined;
  public isLoggedIn: boolean | undefined;

  constructor(private router: Router, private loginService: LoginServiceService) {

  }

  ngOnInit(): void {
    this.loginService.isLoggedIn().subscribe(
      (res) => {
        if(res) {
          this.currentProfile = this.loginService.currentProfile;
          this.router.navigate(['/leaderboard']);
        } else {
          this.router.navigate(['/login']);
        }
      }
    )
  }

  logout(){
    this.loginService.logout();
    this.currentProfile = undefined;
    this.isLoggedIn = false;
  }


}
