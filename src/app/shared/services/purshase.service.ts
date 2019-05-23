import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Purchase } from '../models/Purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  public root = {
    amount: null,
    customerPurchases: null,
    allPurchases: null
  }

  constructor(private http: HttpClient) { }

  public purchaseCoupon(purchase: Purchase, token: number): void {

    let observable = this.http.post(`http://localhost:8080/purchases?token=${token}`, purchase);

    observable.subscribe(

      () => alert("Your purchase has been done"),

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public deletePurchaseById(purchaseId: number, token: number): void {

    let observable = this.http.delete(`http://localhost:8080/purchases/${purchaseId}?token=${token}`);

    observable.subscribe(

      () => alert("Your purchase has been deleted"),

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getAmount(customerId: number, token: number): void {

    let observable = this.http.get<number>(`http://localhost:8080/purchases/amount?customerId=${customerId}&token=${token}`);

    observable.subscribe(

      res => this.root.amount = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getCustomerPurchase(customerId: number, token: number): void {

    let observable = this.http.get<Purchase[]>(`http://localhost:8080/purchases/customer?customerId=${customerId}&token=${token}`);

    observable.subscribe(

      res => this.root.customerPurchases = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getAllPurchases(token: number): void {

    let observable = this.http.get<Purchase[]>(`http://localhost:8080/purchases?token=${token}`);

    observable.subscribe(

      res => this.root.allPurchases = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

}
