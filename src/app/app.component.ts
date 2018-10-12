import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'SWPP HW-2';

  login: boolean;

  constructor(
    private authservice: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authservice.logout();
    this.login = false;
    this.router.navigate(['/sign_in']);
  }
}
