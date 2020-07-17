export type IdType = string;
export interface Identifiable {
    _id: IdType;
}
export class Order {
    _id: IdType;
    products: string;
    totalSum: number;
    address: string;
    user_id: string;
    constructor(
        products: string,
        totalSum: number,
        address: string,
        user_id: string) {

        this.products = products;
        this.totalSum = totalSum;
        this.address = address;
        this.user_id = user_id;
    }
}
