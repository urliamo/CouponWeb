export class User {
 public constructor(
    public userid?: number,
	public email: string,
    public userName: string,
    public password: string,
    public clientType: string,
    public companyId?: string
 ){}
}