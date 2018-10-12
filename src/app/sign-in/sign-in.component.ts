import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})

export class SignInComponent implements OnInit {

  constructor(
    private router: Router,
    private authservice: AuthService,
    private app: AppComponent
  ) { }

  email: string;
  password: string;

  ngOnInit() {
  }

  private doLogin() {
    if (this.authservice.current_user.signed_in) {
      this.app.login = true;
      this.router.navigate(['/articles']);
    }
  }

  sign_in() {
      return this.authservice.checkId(this.email, this.password).then(res => {
          if (res) {
              this.authservice.Sign(true);
              this.doLogin();
          } else {
              alert('Email or password is wrong');
          }
      });
  }
}
