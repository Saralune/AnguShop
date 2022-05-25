import { Customer } from "./customer.model";

export class User {
    userName : string;
    password : string;
    roles : string[];

    customer:  Customer;

    constructor(userName : string, password : string, roles : string[]){
        this.userName = userName;
        this.password = password;
        this.roles = roles;

        this.customer = new Customer('', '', '', '', '')
    }
}