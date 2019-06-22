import { ClientType } from './ClientType';

export class LoginData {
	public constructor(
         public token: number,
         public type: ClientType,
         public userId: number,
         public companyId?: number
	){}
}
