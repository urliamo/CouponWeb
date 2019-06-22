export class Purchase {
 public constructor(
    public purchaseId: number,
    public couponId: number,
	public amount: number,
	public customerId?: number,
    public date?: string
 ){}
}