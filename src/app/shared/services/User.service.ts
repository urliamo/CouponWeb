import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from '../models/LoginForm';
import { LoginData } from '../models/LoginData';
import { User } from '../models/User';
import { Observable } from 'rxjs';


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

  public login(user: LoginForm): Observable<LoginData> {

    return this.http.post<LoginData>("http://localhost:8080/users/login/", user);

   /* observable.subscribe(

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
*/
  }

  public logOut(token: number): Observable<any> {

    return this.http.get(`http://localhost:8080/users/logout?token=${token}`);

   /* observable.subscribe(

      () => {

        alert("You are logged out!\nWe are waiting for next visit");
        sessionStorage.clear();
        this.router.navigate(["/login"]);

      },

      err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );
*/
  }

  public createUser(user: User, token: number): Observable<any> {

    return this.http.post(`http://localhost:8080/users?token=${token}`, user);

 
  }

  public updateUser(user: User, token: number): Observable<any> {

    return this.http.put(`http://localhost:8080/users?token=${token}`, user);


  }

  public deleteMyUser(token: number): Observable<any> {

    return this.http.delete(`http://localhost:8080/users?token=${token}`);

  }

  public deleteUser(userId: number, token: number): Observable<any> {

    return this.http.delete(`http://localhost:8080/users/${userId}?token=${token}`);


  }


  public getUserName(userId: number, token: number): Observable<String> {

    return this.http.get<string>(`http://localhost:8080/users/name/${userId}?token=${token}`);

  }

  public getUser(userId: number, token: number): Observable<User> {

    return this.http.get<User>(`http://localhost:8080/users/${userId}?token=${token}`);


  }

  public getAllUsers(token: number): Observable<User[]> {

    return this.http.get<User[]>(`http://localhost:8080/users?token=${token}`);

   
  }

}
