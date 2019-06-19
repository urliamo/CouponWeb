import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'coupon center';
}

window.addEventListener('beforeunload', (e) => {
  let token: number = <number><unknown>sessionStorage.getItem("token");
  let observable = this.http.get(`http://localhost:8080/users/logout?token=${token}`);
  observable.subscribe(

    () => {

      alert("clear");

    },
    err => alert("Oh crap !.... Error! Status: " + err.status + ".\nMessage: " + err.error.message)

  )
});

