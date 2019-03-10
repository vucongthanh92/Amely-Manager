/* tslint:disable */
import { User } from './user';

/**
 */
export class DefaultResponse {
    token?: string;
    error?: string;
    status?: boolean;
    validation?: User;
    code?: string;
    url?: string;
    to_id?: string;
    id?: string;
    page?: string;
    count?: number;
}
