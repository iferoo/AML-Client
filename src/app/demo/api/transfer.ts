import {Account} from './account';

export interface Transfer {
    id?: number;
    status?: string;
    reciever?: Account;
    transaction?: any;
}
