import { Product } from './product.model';

export type IdType = string;
export interface Identifiable {
    _id: IdType;
}
export class Order {
    _id: IdType;
    products: Product[];
    totalSum: number;
    user_id: string;
    constructor(
        products: Product[],
        totalSum: number,
        user_id: string,
        ) {

        this.products = products;
        this.totalSum = totalSum;
        this.user_id = user_id;
    }
}
