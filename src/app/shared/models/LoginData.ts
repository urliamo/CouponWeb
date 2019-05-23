export class LoginData {
    public constructor(
        public token: number,
        public clientType: string,
        public id: number,
        public companyId?: number,
    ) { }

}
