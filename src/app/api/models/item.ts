/* tslint:disable */
import { Snapshot } from './snapshot';

/**
 */
export class Item {
    price?: string;
    id?: string;
    type?: string;
    time_created?: string;
    title?: string;
    description?: string;
    quantity?: string;
    snapshot_id?: string;
    store_id?: string;
    owner_id?: string;
    expiry_type?: string;
    is_special?: string;
    stored_end?: string;
    end_day?: string;
    so_id?: string;
    wishlist?: string;
    givelist?: string;
    status?: string;
    snapshot?: Snapshot;
}
