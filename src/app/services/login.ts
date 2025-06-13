import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly authService: Auth) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.authService, email, password)
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(
            new Error(
              `Ha ocurrido un error al iniciar sesión en Firebase: ${error}`
            )
          );
        });
    });
  }

  getAuthState(): Observable<any> {
    return authState(this.authService);
  }

  logout(): void {
    this.authService.signOut();
  }
}
