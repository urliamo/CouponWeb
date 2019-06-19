export class LoginData {
	public constructor(
         public token: number,
         public clientType: string,
         public userId: number,
         public companyId?: number
	){}
}
