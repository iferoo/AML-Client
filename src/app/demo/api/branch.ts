interface City {
    label: string;
    value: string;
}
export interface Branch {
    id?: string;
    address?: string;
    city?: City;
    bank_id?: number;
}
