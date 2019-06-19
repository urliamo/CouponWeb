export class Purchase {
 public constructor(
    public purchaseId: number,
    public customerId?: number,
    public couponId: number,
    public amount: number,
    public date?: string
 ){}
}