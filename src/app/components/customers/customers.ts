import { Component, ElementRef, ViewChild } from '@angular/core';
import { Customer } from '../../models/Customer.model';
import { CustomerService } from '../../services/customer';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-customers',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './customers.html',
})
export class CustomersComponent {
  customers: Customer[] | null = null;

  readonly customer: Customer = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: undefined,
  };

  @ViewChild('buttonClose') buttonClose!: ElementRef;

  constructor(private readonly customerService: CustomerService) {}

  ngOnInit(): void {
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

  private closeModal(): void {
    this.buttonClose.nativeElement.click();
  }

  addCustomer(customerForm: NgForm): void {
    const { value, valid } = customerForm;

    if (valid) {
      this.customerService.addCustomer(value);
      customerForm.resetForm();
      this.closeModal();
    }
  }
}
