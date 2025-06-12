import { Routes } from '@angular/router';
import { BoardComponent } from './pages/board/board';
import { LoginComponent } from './pages/login/login';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: BoardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'customer/edit/:id', component: EditCustomerComponent },
  { path: '**', component: NotFoundComponent },
];
