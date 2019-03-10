/* tslint:disable */
import { Item } from './item';
import { Store } from './store';
import { Shop } from './shop';
import { User } from './user';

/**
 */
export class Redeem {
    store_id?: string;
    id?: string;
    type?: string;
    time_created?: string;
    item_id?: string;
    creator_id?: string;
    code?: string;
    owner_id?: string;
    status?: string;
    quantity?: string;
    item?: Item;
    store?: Store;
    shop?: Shop;
    customer?: User;
}
