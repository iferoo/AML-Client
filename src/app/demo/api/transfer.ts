import {Account} from './account';
import {Transaction} from './transaction';

export interface Transfer {
    transferId?: number;
    status?: string;
    reciever?: Account | null;
    transaction?: Transaction;
}
