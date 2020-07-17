// export type IdType = number;
// export interface Identifiable {
//     _id: IdType;
// }
export class Product {
    _id: string;
    productName: string;
    productCode: string;
    releaseDate: Date;
    description: string;
    price: number;
    starRating: number;
    imageUrl: string;
    constructor(
        productName: string,
        productCode: string,
        releaseDate: Date,
        description: string,
        price: number,
        starRating: number,
        imageUrl: string) {

        this.productName = productName;
        this.productCode = productCode;
        this.releaseDate = releaseDate;
        this.description = description;
        this.price = price;
        this.starRating = starRating;
        this.imageUrl = imageUrl;
    }
}
