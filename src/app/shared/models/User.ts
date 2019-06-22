import { ClientType } from './ClientType';

export class User {
 public constructor(
    public userName: string,
	public email: string,
	public password: string,
	public userId?: number,
	public type?:ClientType,
    public companyId?: number
 ){}
}