import { Injectable } from "@angular/core";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class User {
    id: number;
    username: string;
    password: string;
    email: string;
    role: string;
    role_name: string;
    phone: string;
    first_name: string;
    last_name: string;
    token?: string;
}