import { Component } from '@angular/core';
import { LoginUser } from '../shared/models/LoginUser';
import { Customer } from '../shared/models/Customer';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { CustomerService } from '../shared/services/customer.service';

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
  private _phoneNumber: string;
  private _email: string;

  constructor(private userService: UserService, private customerService: CustomerService) { }

  public submit(): void {

    let user: LoginUser = new LoginUser(this._userName, this._password);

    this.userService.login(user);

  }

  public register(): void {

    let customer: Customer = new Customer();
    let user: User = new User();

    customer.firstName = this._firstName;
    customer.lastName = this._lastName;
    user.email = this._email;
    user.password = this._password;
    user.type = "Customer";
    customer.user = user;

    if (this._password == this._passwordConfirm)
      this.customerService.createCustomer(customer);

    else
      alert("Your password isn't even, please try again!");

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
