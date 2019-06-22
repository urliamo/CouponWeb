import { Category } from './Category';

export class Coupon {
 public constructor(
    public companyId: number,
    public title: string,
    public description: string,
    public category: Category,
    public startDate: Date,
    public endDate: Date,
    public amount: number,
    public price: number,
	public image: string,
	public couponId?: number
 ){}
}