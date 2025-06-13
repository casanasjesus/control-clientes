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
import {
  addDoc,
  CollectionReference,
  DocumentData,
  DocumentReference,
} from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  customers: Observable<Customer[]>;
  private readonly customersRef: CollectionReference<Customer>;

  constructor(private readonly firestore: Firestore) {
    this.customersRef = collection(
      this.firestore,
      'clientes'
    ) as CollectionReference<Customer>;

    const firebaseQuery = query(this.customersRef, orderBy('nombre', 'asc'));

    this.customers = collectionData<Customer>(firebaseQuery, {
      idField: 'id',
    }) as Observable<Customer[]>;
  }

  getCustomers(): Observable<Customer[]> {
    return this.customers;
  }

  addCustomer(
    customer: Customer
  ): Promise<DocumentReference<Customer, DocumentData>> {
    return addDoc(this.customersRef, customer);
  }
}
