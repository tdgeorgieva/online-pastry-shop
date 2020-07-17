import { Product } from './product.model';

export type IdType = string;
export interface Identifiable {
    _id: IdType;
}
export class Order {
    _id: IdType;
    products: Product[];
    totalSum: number;
    address: string;
    user_id: string;
    order_id: string;
    constructor(
        products: Product[],
        totalSum: number,
        address: string,
        user_id: string,
        order_id: string
        ) {

        this.products = products;
        this.totalSum = totalSum;
        this.address = address;
        this.user_id = user_id;
        this.order_id = order_id;
    }
}
