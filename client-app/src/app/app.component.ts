import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular';
  isAuthenticated: boolean;
  constructor(private authService: AuthService, private router: Router) {}
  async ngOnInit() {
    this.routeToHome();
    await this.authService.checkAuth().toPromise();
    //this.routeToHome();
    this.authService
      .isLoggedIn()
      .subscribe((isAuthenticated) => (this.isAuthenticated = isAuthenticated));
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }

  routeToHome() {
    if (!this.isAuthenticated) {
      this.router.navigate(['home']);
    }
  }
}
