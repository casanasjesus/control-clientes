import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  loggedInUser: string | null = null;

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.loginService.getAuthState().subscribe((user: User) => {
      if (user) {
        this.isLoggedIn = true;
        this.loggedInUser = user.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout(): void {
    this.loginService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
