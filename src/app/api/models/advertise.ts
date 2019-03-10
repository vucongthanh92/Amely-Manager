/* tslint:disable */
import { Product } from './product';
import { Shop } from './shop';
import { Creator } from './creator';

/**
 */
export class Advertise {
    link?: string;
    id?: string;
    type?: string;
    time_created?: string;
    title?: string;
    description?: string;
    advertise_type?: string;
    time_type?: string;
    target_id?: string;
    budget?: string;
    cpc?: string;
    owner_id?: string;
    amount?: string;
    start_time?: number;
    end_time?: number;
    status?: string;
    total_click?: string;
    approved?: string;
    creator_id?: string;
    image?: string;
    product?: Product;
    shop?: Shop;
    creator?: Creator;
}
