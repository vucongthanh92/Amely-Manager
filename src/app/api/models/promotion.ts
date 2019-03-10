/* tslint:disable */
import { PromotionItems } from './promotion-items';

/**
 */
export class Promotion {
    time_type?: string;
    id?: string;
    type?: string;
    time_created?: string;
    title?: string;
    description?: string;
    owner_id?: string;
    start_time?: string;
    end_time?: string;
    status?: string;
    approved?: string;
    items?: PromotionItems[];
}
