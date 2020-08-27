import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  isAuthenticated: boolean;
  constructor(private authService: AuthService) {}
  async ngOnInit() {
    await this.authService.checkAuth().toPromise();
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

  isUserLoggedIn() {
    return this.authService.isLoggedIn;
  }
}
