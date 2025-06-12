import { Component } from '@angular/core';
import { Customer } from '../../models/Customer.model';
import { CustomerService } from '../../services/customer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  imports: [CommonModule],
  templateUrl: './customers.html',
})
export class CustomersComponent {
  customers: Customer[] | null = null;

  constructor(private readonly customerService: CustomerService) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe((customers: Customer[]) => {
      this.customers = customers;
    });
  }
}
