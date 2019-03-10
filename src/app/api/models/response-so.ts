/* tslint:disable */
import { Snapshot } from './snapshot';
import { DO } from './do';
import { PO } from './po';
import { SO } from './so';
import { User } from './user';
import { Redeem } from './redeem';

/**
 */
export class ResponseSO {
    items?: Snapshot[];
    dos?: DO[];
    po?: PO;
    so?: SO;
    customer?: User;
    redeems?: Redeem[];
}
