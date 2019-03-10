/* tslint:disable */
import { Snapshot } from './snapshot';

/**
 */
export class SO {
    store_id?: string;
    id?: string;
    type?: string;
    time_created?: string;
    title?: string;
    description?: string;
    status?: string;
    owner_id?: string;
    shipping_fee?: string;
    order_items_snapshot?: string;
    total?: string;
    quantity?: string;
    display_order?: string;
    items?: Snapshot[];
}
