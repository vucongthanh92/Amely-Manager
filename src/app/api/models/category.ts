/* tslint:disable */
import { Shop } from './shop';
import { User } from './user';

/**
 */
export class Category {
    friendly_url?: string;
    id?: string;
    type?: string;
    time_created?: string;
    title?: string;
    description?: string;
    subtype?: string;
    owner_id?: string;
    sort_order?: string;
    enabled?: string;
    parent_id?: string;
    creator_id?: string;
    logo?: string;
    shop?: Shop;
    creator?: User;
}
