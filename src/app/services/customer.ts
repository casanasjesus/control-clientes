import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer.model';
import {
  Firestore,
  collection,
  orderBy,
  query,
  collectionData,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customers: Observable<Customer[]>;

  constructor(private readonly firestore: Firestore) {
    const customersRef = collection(this.firestore, 'clientes');
    const firebaseQuery = query(customersRef, orderBy('nombre', 'asc'));

    this.customers = collectionData(firebaseQuery, {
      idField: 'id',
    }) as Observable<Customer[]>;
  }

  getCustomers(): Observable<Customer[]> {
    return this.customers;
  }
}
