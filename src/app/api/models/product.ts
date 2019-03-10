/* tslint:disable */
import { Shop } from './shop';
import { Category } from './category';

/**
 */
export class Product {
    end_day?: string;
    id?: string;
    type?: string;
    time_created?: string;
    title?: string;
    description?: string;
    sku?: string;
    snapshot_id?: string;
    price?: string;
    sale_price?: string;
    model?: string;
    tag?: string;
    number_sold?: number;
    tax?: string;
    friendly_url?: string;
    weight?: string;
    expiry_type?: string;
    currency?: string;
    origin?: string;
    product_order?: string;
    storage_duration?: string;
    is_special?: string;
    product_group?: string;
    creator_id?: string;
    custom_attributes?: string;
    download?: string;
    featured?: string;
    duration?: string;
    begin_day?: string;
    owner_id?: string;
    manufacturer?: string;
    unit?: string;
    approved?: string;
    enabled?: string;
    voucher_category?: string;
    ticket_category?: string;
    shop_category?: string;
    market_category?: string;
    category?: string;
    adjourn_price?: string;
    subtype?: string;
    quantity?: string;
    display_old_price?: string;
    qty?: string;
    advertise_guid?: number;
    creator_guid?: string;
    redeem_quantity?: string;
    current_snapshot?: number;
    hasInventory?: number;
    display_quantity?: number;
    images?: string[];
    parent_id?: string;
    status?: string;
    images_name?: string[];
    display_price?: string;
    display_currency?: string;
    shop?: Shop;
    categories?: Category[];
}
