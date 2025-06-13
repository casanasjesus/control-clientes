import { Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board';
import { LoginComponent } from './pages/login/login';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer';
import { NotFoundComponent } from './pages/not-found/not-found';
import { LoginGuardianService } from './services/login-guardian';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: BoardComponent, canActivate: [LoginGuardianService] },
  {
    path: 'customer/edit/:id',
    component: EditCustomerComponent,
    canActivate: [LoginGuardianService],
  },
  { path: '**', component: NotFoundComponent },
];
