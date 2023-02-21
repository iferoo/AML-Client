import {BankCustomer} from './bankCustomer';
import {Employee} from './employee';
import {Branch} from './branch';

export interface Account {
    id?: number;
    type?: string;
    balance?: number;
    customer?: BankCustomer;
    employee?: Employee;
    branch?: Branch;
}
