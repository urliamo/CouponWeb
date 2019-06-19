import { User } from './User';

export class Customer {
 public constructor(
    public id?: number,
    public firstName: string,
    public lastName: string,
    public user?: User
 ){}
}