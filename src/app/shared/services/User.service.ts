import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginUser } from '../models/LoginUser';
import { UserDataClient } from '../models/UserDataClient';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public myName: string = null;

  public root = {
    user: null,
    allUsers: null
  }

  constructor(private http: HttpClient, private router: Router) { }

  public login(user: LoginUser): void {

    let observable = this.http.post<UserDataClient>("http://localhost:8080/users/login/unsecured", user);

    observable.subscribe(

      res => {

        if (res.clientType === "Customer")
          this.router.navigate(["customer"]);

        else if (res.clientType === "Company") {
			sessionStorage.setItem("company", res.companyId + "");
			this.router.navigate(["company"]);
        }

        else
          this.router.navigate(["administrator"]);

        sessionStorage.setItem("token", res.token + "");
        sessionStorage.setItem("id", res.id + "");

      },

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    )

  }

  public logOut(token: number): void {

    let observable = this.http.get(`http://localhost:8080/users/logout?token=${token}`);

    observable.subscribe(

      () => {

        alert("You are log out!\nWe are waiting for next visit");
        sessionStorage.clear();
        this.router.navigate(["/login"]);

      },

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public createUser(user: User, token: number): void {

    let observable = this.http.post(`http://localhost:8080/users?token=${token}`, user);

    observable.subscribe(

      () => alert("user has been created"),

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public updateUser(user: User, token: number): void {

    let observable = this.http.put(`http://localhost:8080/users?token=${token}`, user);

    observable.subscribe(

      () => alert("Your user has been updated"),

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public deleteMyUser(token: number): void {

    let observable = this.http.delete(`http://localhost:8080/users?token=${token}`);

    observable.subscribe(

      () => {

        alert("Your user has been deleted");
        this.router.navigate(["/login"]);

      },
      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public deleteUser(userId: number, token: number): void {

    let observable = this.http.delete(`http://localhost:8080/users/${userId}?token=${token}`);

    observable.subscribe(

      () => alert("user has been deleted"),

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }


  public getUserName(userId: number, token: number): void {

    let observable = this.http.get<string>(`http://localhost:8080/users/name/${userId}?token=${token}`);

    observable.subscribe(

      res => this.myName = res,

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getUser(userId: number, token: number): void {

    let observable = this.http.get<User>(`http://localhost:8080/users/${userId}?token=${token}`);

    observable.subscribe(

      res => this.root.user = res,

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getAllUsers(token: number): void {

    let observable = this.http.get<User[]>(`http://localhost:8080/users?token=${token}`);

    observable.subscribe(

      res => this.root.allUsers = res,

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

}
