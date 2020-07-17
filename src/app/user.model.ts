export type IdType = string;
export interface Identifiable {
    _id: IdType;
}
export enum Role {
    Regular = 'regular', Admin = 'admin'
}
export class User implements Identifiable {
    _id: IdType;
    role: Role;

    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phone: boolean;
    city?: string;
    address?: string;
    image?: string;

    constructor(

        firstName: string,
        lastName: string,
        password: string,
        email: string,
        phone: boolean,
        city?: string,
        address?: string,
        image?: string,
        role: Role = Role.Regular,
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.city = city;
        this.address = address;
        this.image = image;
        this.role = role;
    }
}
