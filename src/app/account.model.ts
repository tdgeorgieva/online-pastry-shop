export type IdType = number;
export interface Identifiable {
    id: IdType;
}
export class Account implements Identifiable {
    id: IdType;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: boolean;
    city?: string;
    address?: string;
    constructor(
                firstName: string,
                lastName: string,
                password: string,
                email: string,
                phone: boolean,
                city?: string,
                address?: string,
               ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.address = address;
    }
}
