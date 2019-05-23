import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public root = {
    company: null,
    allCompanies: null
  }

  constructor(private http: HttpClient) { }

  public createCompany(company: Company, token: number): void {

    let observable = this.http.post(`http://localhost:8080/companies?token=${token}`, company);

    observable.subscribe(

      () => alert("company has been created"),

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public updateCompany(company: Company, token: number): void {

    let observable = this.http.put(`http://localhost:8080/companies?token=${token}`, company);

    observable.subscribe(

      () => alert("company has been updated"),

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public deleteCompany(companyId: number, token: number): void {

    let observable = this.http.delete(`http://localhost:8080/companies/${companyId}?token=${token}`);

    observable.subscribe(

      () => alert("company has been deleted"),

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getCompany(companyId: number, token: number): void {

    let observable = this.http.get<Company>(`http://localhost:8080/companies/${companyId}?token=${token}`);

    observable.subscribe(

      res => this.root.company = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getAllCompanies(token: number): void {

    let observable = this.http.get<Company[]>(`http://localhost:8080/companies?token=${token}`);

    observable.subscribe(

      res => this.root.allCompanies = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

}
