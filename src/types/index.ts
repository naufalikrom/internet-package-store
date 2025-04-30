export interface Customer {
    id: number;
    phone: string;
    password: string;
    name: string;
    email: string;
}

export interface LoginResponse {
    customer: Customer;
    token: string;
}

export interface Package {
    id: number;
    name: string;
    price: number;
    duration: string;
}

export interface Transaction {
    id: number;
    customerId: number;
    packageId: number;
    date: string;
    amount: number;
}