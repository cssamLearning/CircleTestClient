import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LoginServiceService} from "../login-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    name: new FormControl(''),
  });

  constructor(private loginService: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loginService.login(this.loginForm.value)
  }

}
