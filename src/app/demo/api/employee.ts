import {Bank} from './bank';
import {Branch} from './branch';

export interface Employee {
    employeeId?: number;
    name?: string;
    salary?: number;
    email?: string;
    bank?: Bank;
    branch?: Branch;
    createdAt?: string;
    isDeleted?: boolean;
    deletedAt?: string;
}
