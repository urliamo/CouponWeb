import { Injectable } from '@angular/core';
import { Coupon } from '../models/Coupon';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  public root = {
    getCompanyCouponsByCompanyId: null,
    getCompanyCouponsByCategory: null,
    getCompanyCouponsByMaxPrice: null,
    getCustomerCouponsByCustomerId: null,
    getCustomerCouponsByCategory: null,
    getCustomerCouponsByMaxPrice: null,
    allCoupons: null
  }

  constructor(private http: HttpClient) { }

  public createCoupon(coupon: Coupon, token: number): void {

    let observable = this.http.post(`http://localhost:8080/coupons?token=${token}`, coupon);

    observable.subscribe(

      () => alert("Your coupon has been created"),

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public updateCoupon(coupon: Coupon, token: number): void {

    let observable = this.http.put(`http://localhost:8080/coupons?token=${token}`, coupon);

    observable.subscribe(

      () => alert("Your coupon has been updated"),

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public deleteCoupon(couponId: number, companyId: number, token: number): void {

    let observable = this.http.delete(`http://localhost:8080/coupons/${couponId}?companyId=${companyId}&token=${token}`);

    observable.subscribe(

      () => alert("Your coupon has been deleted"),

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getCompanyCouponsByCompanyId(companyId: number, token: number): void {

    let observable = this.http.get<Coupon[]>(`http://localhost:8080/coupons/company?companyId=${companyId}&token=${token}`);

    observable.subscribe(

      res => this.root.getCompanyCouponsByCompanyId = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getCompanyCouponsByCategory(companyId: number, category: string, token: number): void {

    let observable = this.http.get<Coupon[]>(`http://localhost:8080/coupons/company/category?companyId=${companyId}&category=${category}&token=${token}`);

    observable.subscribe(

      res => this.root.getCompanyCouponsByCategory = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getCompanyCouponsByMaxPrice(companyId: number, maxPrice: number, token: number): void {

    let observable = this.http.get<Coupon[]>(`http://localhost:8080/coupons/company/price?companyId=${companyId}&maxPrice=${maxPrice}&token=${token}`);

    observable.subscribe(

      res => this.root.getCompanyCouponsByMaxPrice = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getCustomerCouponsByCustomerId(customerId: number, token: number): void {

    let observable = this.http.get<Coupon[]>(`http://localhost:8080/coupons/customer?customerId=${customerId}&token=${token}`);

    observable.subscribe(

      res => this.root.getCustomerCouponsByCustomerId = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getCustomerCouponsByCategory(customerId: number, category: string, token: number): void {

    let observable = this.http.get<Coupon[]>(`http://localhost:8080/coupons/customer/category?customerId=${customerId}&category=${category}&token=${token}`);

    observable.subscribe(

      res => this.root.getCustomerCouponsByCategory = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getCustomerCouponsByMaxPrice(customerId: number, maxPrice: number, token: number): void {

    let observable = this.http.get<Coupon[]>(`http://localhost:8080/coupons/customer/price?customerId=${customerId}&maxPrice=${maxPrice}&token=${token}`);

    observable.subscribe(

      res => this.root.getCustomerCouponsByMaxPrice = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

  public getAllCoupon(token: number): void {

    let observable = this.http.get<Coupon[]>(`http://localhost:8080/coupons?token=${token}`);

    observable.subscribe(

      res => this.root.allCoupons = res,

      err => alert("  Error! Status: " + err.status + ".\nMessage: " + err.error.message)

    );

  }

}
