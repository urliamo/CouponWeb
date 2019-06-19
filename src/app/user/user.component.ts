import { Component } from '@angular/core';
import { LoginForm } from '../shared/models/LoginForm';
import { LoginData } from '../shared/models/LoginData';
import { Customer } from '../shared/models/Customer';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { CustomerService } from '../shared/services/customer.service';
import { Router } from '@angular/router';

@Component({ 
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  private _userName: string = null;
  private _password: string = null;
  private _passwordConfirm: string;
  private _firstName: string;
  private _lastName: string;
  private _email: string;

  constructor(private userService: UserService, private customerService: CustomerService, private router: Router) { }

  public submit(): void {

	let user: LoginForm = new LoginForm();
	user.userName = this._userName;
	user.password = this._password

	let observable = this.userService.login(user);
	observable.subscribe
	(
	res => {
          if (res.clientType === "Customer"){
			this.router.navigate(["login/customer"]);
		  }

          else if (res.clientType === "Company") {
            this.router.navigate(["login/company"]);
            sessionStorage.setItem("company", res.companyId + "");
          }

          else{
            this.router.navigate(["login/administrator"]);
		  }
          sessionStorage.setItem("token", res.token + "");
          sessionStorage.setItem("id", res.userId + "");
          this._userName = null;
          this._password = null;

        },

        err => alert("Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

      );

  }

  public register(): void {

	let user: User = new User();
	user.userName = this._userName;
	user.password = this._password;
	user.email = this._email;
	user.type = "Customer";
    let customer: Customer = new Customer();
	customer.firstName = this._firstName;
	customer.lastName = this._lastName;
	customer.user = user;
    if (this._password == this._passwordConfirm){
	 let observable =  this.customerService.createCustomer(customer);
		 observable.subscribe
		(

          () => alert("your user has been created"),

          err => alert("Oh crap !.... Error! Status: " + err.error.statusCode + ".\nMessage: " + err.error.externalMessage)

        );
	}
    else
      alert("password mismatch, please try again!");

  }

  public toggleSignup() {

    document.getElementById("login-toggle").style.backgroundColor = "#fff";
    document.getElementById("login-toggle").style.color = "#222";
    document.getElementById("signup-toggle").style.backgroundColor = "#57b846";
    document.getElementById("signup-toggle").style.color = "#fff";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("signup-form").style.display = "block";

  }

  public toggleLogin() {

    document.getElementById("login-toggle").style.backgroundColor = "#57B846";
    document.getElementById("login-toggle").style.color = "#fff";
    document.getElementById("signup-toggle").style.backgroundColor = "#fff";
    document.getElementById("signup-toggle").style.color = "#222";
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";

  }

}
