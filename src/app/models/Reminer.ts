import { OCCURS } from "./OCCURS";
import { BaseModel } from '../libs/base.model';

export class Reminder extends BaseModel {
    public date: string;
    public note: string;
    public frequency = OCCURS.ONCE;
    constructor(
        public entityID?: number,
        public entityClass?: string
    ) { super('Reminder'); }
}