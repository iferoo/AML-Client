import {Bank} from './bank';

export interface Branch {
    id?: number;
    address?: string;
    city?: string;
    bank?: Bank;
}
