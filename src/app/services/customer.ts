import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer.model';
import {
  Firestore,
  collection,
  orderBy,
  query,
  collectionData,
  docData,
} from '@angular/fire/firestore';
import {
  addDoc,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  updateDoc,
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

  getCustomer(id: string): Observable<Customer | null> {
    const customerDocRef = doc(this.firestore, `clientes/${id}`);
    return docData(customerDocRef, { idField: 'id' }) as Observable<Customer>;
  }

  editCustomer(customer: Customer): Promise<void> {
    const customerDoc = doc(this.firestore, `clientes/${customer.id}`);
    return updateDoc(customerDoc, { ...customer });
  }

  deleteCustomer(customer: Customer): Promise<void> {
    const customerDoc = doc(this.firestore, `clientes/${customer.id}`);
    return deleteDoc(customerDoc);
  }
}
