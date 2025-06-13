import { Component } from '@angular/core';
import { CustomersComponent } from '../../components/customers/customers';

@Component({
  selector: 'app-board',
  imports: [CustomersComponent],
  templateUrl: './board.html',
})
export class BoardComponent {
  readonly title: string = 'Control de Clientes';
}
