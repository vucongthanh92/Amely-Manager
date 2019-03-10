/* tslint:disable */
import { Store } from './store';

/**
 */
export class ResponsePutRedeem {
    id?: string;
    owner_id?: string;
    type?: string;
    time_created?: string;
    item_id?: string;
    creator_id?: string;
    code?: string;
    store_id?: string;
    status?: string;
    store?: Store;
}
