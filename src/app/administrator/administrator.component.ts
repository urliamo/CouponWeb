import { Component, OnInit } from '@angular/core';
import { Company } from '../shared/models/Company';
import { User } from '../shared/models/User';
import { UserService } from '../shared/services/user.service';
import { CompanyService } from '../shared/services/company.service';
import { CustomerService } from '../shared/services/customer.service';
import { PurchaseService } from '../shared/services/purshase.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.css']
})
export class AdministratorComponent implements OnInit {

  private companyName: string = null;
  private phoneNumber: string = null;
  private email: string = null;

  private companyId: number;

  //create user
  private userName: string = null;
  private password: string = null;
  private type: string = null;
  private companyIdUser: string = null;

  //update user
  private userId: number;

  public token: number;
  public id: number;
  public userServiceInstance = this.userService.root;
  public companyServiceInstance = this.companyService.root;
  public customerServiceInstance = this.customerService.root;
  public purchaseServiceInstance = this.purchaseService.root;

  constructor(private userService: UserService, private companyService: CompanyService, private customerService: CustomerService, private purchaseService: PurchaseService) {

    this.token = <number><unknown>sessionStorage.getItem("token");
    this.id = <number><unknown>sessionStorage.getItem("id");

  }

  ngOnInit(): void {

    this.userService.getUserName(this.id, this.token);

  }

  public logOut(): void {

    this.userService.logOut(this.token);

  }

  public createCompany(): void {

    let company: Company = new Company();
    company.name = this.companyName;
    company.phoneNumber = this.phoneNumber;
    company.email = this.email;

    this.companyService.createCompany(company, this.token);

  }

  public createUser() {

    let user: User = new User();
    user.userName = this.userName;
    user.password = this.password;
    user.type = this.type;
    user.companyId = this.companyIdUser;

    this.userService.createUser(user, this.token);

  }

  public updateUser() {

    let user: User = new User();
    user.id = this.userId;
    user.userName = this.userName;
    user.password = this.password;

    this.userService.updateUser(user, this.token);

  }

  public updateCompany() {

    let company: Company = new Company();
    company.id = this.companyId;
    company.name = this.companyName;
    company.phoneNumber = this.phoneNumber;
    company.email = this.email;

    this.companyService.updateCompany(company, this.token);

  }

  public deleteMyUser() {

    this.userService.deleteMyUser(this.id, this.token);

  }

  public deleteUser(userId: number) {

    this.userService.deleteUser(userId, this.token);

  }

  public deleteCompany(companyId: number) {

    this.companyService.deleteCompany(companyId, this.token);

  }

  public getAllCompanies() {

    this.companyService.getAllCompanies(this.token);

  }

  public getAllCustomers() {

    this.customerService.getAllCustomers(this.token);

  }

  public getAllPurchases() {

    this.purchaseService.getAllPurchases(this.token);

  }

  public getAllUsers() {

    this.userService.getAllUsers(this.token);

  }

  // user by html
  public availableDelete(type: string, id: number): boolean {

    if (type == "Customer" || id == this.id)
      return false;
    return true;

  }

}
