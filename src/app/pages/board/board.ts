import { Component } from '@angular/core';
import { CustomersComponent } from '../../components/customers/customers';

@Component({
  selector: 'app-board',
  imports: [CustomersComponent],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class BoardComponent {}
