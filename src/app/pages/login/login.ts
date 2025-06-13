import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login';
import { User } from '../../models/User.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  readonly email: string | null = null;
  readonly password: string | null = null;
  message: string | null = null;

  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loginService.getAuthState().subscribe((user: User) => {
      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  login(): void {
    if (this.email && this.password) {
      this.loginService
        .login(this.email, this.password)
        .then(() => {
          this.router.navigate(['/']);
        })
        .catch((error) => {
          this.message = `Error en login: ${error}`;
          console.warn(
            `Ha ocurrido un error en el servicio LoginService ${error}`
          );
        });
    } else {
      this.message = 'Ingresa un email y password válido';
    }
  }
}
