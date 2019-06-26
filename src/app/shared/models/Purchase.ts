export class Purchase {
 public constructor(
    public couponID: number,
	public amount: number,
	public customerID: number,
	public purchaseID?: number,

 ){}
}