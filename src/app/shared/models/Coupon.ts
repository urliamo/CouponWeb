export class Coupon {
 public constructor(
    public couponId?: number,
    public companyId: number,
    public title: string,
    public description: string,
    public category: string,
    public startDate: Date,
    public endDate: Date,
    public amount: number,
    public price: number,
    public image: string
 ){}
}