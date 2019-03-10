/* tslint:disable */
import { SO } from './so';
import { PO } from './po';
import { Shop } from './shop';
import { Owner } from './owner';
import { Snapshot } from './snapshot';

/**
 */
export class DO {
    shipping_district?: string;
    id?: string;
    type?: string;
    time_created?: string;
    title?: string;
    description?: string;
    so_id?: string;
    store_id?: string;
    item_id?: string;
    order_items_snapshot?: string;
    status?: string;
    shipping_fullname?: string;
    shipping_phone?: string;
    shipping_address?: string;
    shipping_province?: string;
    owner_id?: string;
    shipping_ward?: string;
    shipping_note?: string;
    shipping_method?: string;
    shipping_fee?: string;
    display_order?: string;
    shipping_province_name?: string;
    shipping_district_name?: string;
    shipping_ward_name?: string;
    shipping_full_address?: string;
    so?: SO;
    po?: PO;
    shop?: Shop;
    owner?: Owner;
    items?: Snapshot[];
}
