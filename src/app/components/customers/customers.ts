import { Component } from '@angular/core';
import { Customer } from '../../models/Customer.model';
import { CustomerService } from '../../services/customer';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, RouterModule],
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

  getTotalBalance(): number {
    return (
      this.customers?.reduce(
        (total, customer) => total + (customer?.saldo ?? 0),
        0
      ) ?? 0
    );
  }
}
