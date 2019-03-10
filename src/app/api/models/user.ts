/* tslint:disable */
import { Shop } from './shop';

/**
 */
export class User {
    address?: string;
    id?: string;
    username?: string;
    password?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    last_login?: number;
    last_activity?: number;
    time_created?: number;
    mobilelogin?: string;
    birthdate?: string;
    gender?: string;
    usercurrency?: string;
    province?: string;
    district?: string;
    ward?: string;
    type?: string;
    friends_hidden?: string;
    birthdate_hidden?: string;
    mobile_hidden?: string;
    language?: string;
    chain_store?: string;
    avatar?: string;
    cover?: string;
    gift_count?: number;
    offer_count?: number;
    blockedusers?: string[];
    fullname?: string;
    shop?: Shop;
    mood?: string;
    thought?: string;
    requested?: string;
    full_address?: string;
    rule_id?: string;
}
