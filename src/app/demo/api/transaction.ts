import {Account} from './account';

export interface Transaction {
    id?: number;
    method?: string;
    operation?: string;
    amount?: number;
    date?: Date;
    account?: Account;
}
