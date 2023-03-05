import {Account} from './account';

export interface Transaction {
    id?: number;
    method?: string;
    operation?: string;
    amount?: number;
    createdDate?: string | null;
    createdTime?: string | null;
    account?: Account;
}
