/* tslint:disable */
import { Store } from './store';

/**
 */
export class Shop {
    owner_province?: string;
    id?: string;
    type?: string;
    time_created?: number;
    title?: string;
    description?: string;
    shop_bidn?: string;
    approved?: number;
    friendly_url?: string;
    shipping_method?: number;
    owner_name?: string;
    owner_phone?: string;
    owner_address?: string;
    owner_id?: string;
    owner_district?: string;
    owner_ward?: string;
    owner_ssn?: string;
    status?: number;
    introduce?: string;
    policy?: string;
    contact?: string;
    avatar?: string;
    cover?: string;
    files_scan?: string;
    liked?: boolean;
    store?: Store;
    stores?: Store[];
}
