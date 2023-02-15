import {Bank} from './bank';
import {Branch} from './branch';

export interface Employee {
    id?: number;
    name?: string;
    salary?: number;
    email?: string;
    bank?: Bank;
    branch?: Branch;
}
