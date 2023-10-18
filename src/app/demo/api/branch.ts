import {Bank} from './bank';

export interface Branch {
    branchId?: number;
    address?: string;
    city?: string;
    bank?: Bank;
    createdAt?: string;
    isDeleted?: boolean;
    deletedAt?: string;
}
