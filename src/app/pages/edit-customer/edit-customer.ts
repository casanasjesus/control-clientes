import { Component } from '@angular/core';
import { Customer } from '../../models/Customer.model';
import { CustomerService } from '../../services/customer';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-customer',
  imports: [FormsModule, RouterModule],
  templateUrl: './edit-customer.html',
})
export class EditCustomerComponent {
  customer: Customer = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: undefined,
  };

  id: string | null = null;

  constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.customerService
        .getCustomer(this.id)
        .subscribe((customer: Customer | null) => {
          if (customer) {
            this.customer = customer;
          } else {
            console.warn(`Cliente no encontrado: ${this.id}`);
            this.router.navigate(['/']);
          }
        });
    } else {
      console.warn('Id de cliente no proporcionado');
      this.router.navigate(['/']);
    }
  }

  saveCustomer(customerForm: NgForm): void {
    const { value, valid } = customerForm;

    if (valid) {
      value.id = this.id;
      this.customerService.editCustomer(value);
      this.router.navigate(['/']);
    }
  }

  deleteCustomer(): void {
    if (confirm('¿Seguro que deseas eliminar el cliente?')) {
      this.customerService.deleteCustomer(this.customer);
      this.router.navigate(['/']);
    }
  }
}
