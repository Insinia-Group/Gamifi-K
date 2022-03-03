import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {fadeIn} from '../config/animations.config';
import {HttpService} from '../services/http.service';
import {JwtService} from '../services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [fadeIn]
})

export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private request: HttpService, private jwt: JwtService) {
    this.request = request;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  async logIn() {
    const user = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }
    await this.request.login(user);
  }

  fiveSeconds() {
    //     this.timeOut = true;
    setTimeout(() => {
      //       this.timeOut = false;
    }, 5000);
  }
}
