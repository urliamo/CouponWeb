import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Customer } from '../models/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public myName: string = null;

  public root = {
    customer: null,
    allCustomers: null
  }

  constructor(private http: HttpClient, private router: Router) { }


  public createCustomer(customer: Customer): Observable<any> {

   return this.http.post("http://localhost:8080/customers", customer);


  }

  public updateCustomer(customer: Customer, token: number): Observable<any> {

   return this.http.put(`http://localhost:8080/customers?token=${token}`, customer);

 /*    observable.subscribe(

	  () => {alert("Your customer has been updated");
	  res
		},
      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    ); */

  }

  public deleteCustomer(customerId: number, token: number): Observable<any> {

    return this.http.delete(`http://localhost:8080/customers/${customerId}?token=${token}`);

   /*  observable.subscribe(

      () => {

        alert("Your customer has been deleted");
        this.router.navigate(["/login"]);

      },
      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    ); */

  }

  public getCustomerName(customerId: number, token: number): Observable<String> {

    return this.http.get<string>(`http://localhost:8080/customers/name/${customerId}?token=${token}`);

 /*    observable.subscribe(

      res => this.myName = res,

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    ); */

  }

  public getCustomer(customerId: number, token: number): Observable<Customer> {

   return this.http.get<Customer>(`http://localhost:8080/customers/${customerId}?token=${token}`);

   /*  observable.subscribe(

      res => this.root.customer = res,

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );
 */
  }

  public getAllCustomers(token: number): Observable<Customer[]> {

   return this.http.get<Customer[]>(`http://localhost:8080/customers?token=${token}`);

   /*  observable.subscribe(

      res => this.root.allCustomers = res,

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );
 */
  }

}
