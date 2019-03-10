/* tslint:disable */
import { Owner } from './owner';

/**
 */
export class ProductGroup {
    description?: string;
    id?: string;
    type?: string;
    time_created?: number;
    title?: string;
    owner_id?: string;
    percent?: number;
    price?: number;
    currency?: string;
    status?: string;
    owner?: Owner;
}
