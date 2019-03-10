/* tslint:disable */
import { RulePermission } from './rule-permission';

/**
 */
export class Rule {
    id?: string;
    time_created?: string;
    title?: string;
    creator_id?: string;
    status?: string;
    permissions?: RulePermission[];
}
