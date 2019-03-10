/* tslint:disable */
import { RequestPromotionItem } from './request-promotion-item';

/**
 */
export class RequestPostPromotion {
    promotion_id?: string;
    shop_id?: string;
    title?: string;
    time_type?: string;
    start_time?: string;
    end_time?: string;
    items?: RequestPromotionItem[];
    status?: string;
}
