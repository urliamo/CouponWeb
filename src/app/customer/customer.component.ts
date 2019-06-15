import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/User';
import { Customer } from '../shared/models/Customer';
import { Purchase } from '../shared/models/Purchase';
import { CustomerService } from '../shared/services/customer.service';
import { UserService } from '../shared/services/user.service';
import { PurchaseService } from '../shared/services/purshase.service';
import { CouponService } from '../shared/services/coupon.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  private userName: string;
  private password: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  // amount of purchase
  private amount: number;

  private maxPrice: number;

  private category: string;

  public token: number;
  public id: number;
  public customerServiceInstance = this.customerService.root;
  public userServiceInstance = this.userService.root;
  public purchaseServiceInstance = this.purchaseService.root;
  public couponServiceInstance = this.couponService.root;

  constructor(private customerService: CustomerService, private userService: UserService, private purchaseService: PurchaseService, private couponService: CouponService) {

    this.token = <number><unknown>sessionStorage.getItem("token");
    this.id = <number><unknown>sessionStorage.getItem("id");

  }

  ngOnInit(): void {

    this.customerService.getCustomerName(this.id, this.token);
    this.purchaseService.getAmount(this.id, this.token);

  }

  public logOut(): void {

    this.userService.logOut(this.token);

  }

  public purchaseCoupon(couponId: number): void {

    let purchse: Purchase = new Purchase();
    purchse.couponId = couponId;
    purchse.customerId = this.id;
    purchse.amount = this.amount;

    this.purchaseService.purchaseCoupon(purchse, this.token);
    this.couponService.getAllCoupon(this.token);
    this.purchaseService.getAmount(this.id, this.token);
    // check if i bout coupon this refresh list

  }

  public updateCustomer(): void {

    let customer: Customer = new Customer();
    let user: User = new User();

    customer.id = this.id;
    customer.firstName = this.firstName;
    customer.lastName = this.lastName;
    user.email = this.email;
    user.id = this.id;
    user.userName = this.userName;
    user.password = this.password;
    user.type = "Customer";
    customer.user = user;

    this.customerService.updateCustomer(customer, this.token);

  }

  public deleteCustomer(): void {

    this.customerService.deleteCustomer(this.id, this.token);

  }

  public deletePurchaseById(purchaseId: number): void {

    this.purchaseService.deletePurchaseById(purchaseId, this.token);

  }

  public getCustomer(): void {

    this.customerService.getCustomer(this.id, this.token);

  }

  public getUser(): void {

    this.userService.getUser(this.id, this.token);

  }

  public getCustomerPurchase(): void {

    this.purchaseService.getCustomerPurchase(this.id, this.token);

  }

  public getCustomerCouponsByCustomerId(): void {

    this.couponService.getCustomerCouponsByCustomerId(this.id, this.token);

  }

  public getCustomerCouponsByCategory(): void {

    if (this.category == null)
      alert("Enter category plz");

    else
      this.couponService.getCustomerCouponsByCategory(this.id, this.category, this.token);

  }

  public getCustomerCouponsByMaxPrice(): void {

    if (this.maxPrice == null)
      alert("Enter max price plz");

    else
      this.couponService.getCustomerCouponsByMaxPrice(this.id, this.maxPrice, this.token);

  }

  public getAllCoupon(): void {

    this.couponService.getAllCoupon(this.token);

  }

}
