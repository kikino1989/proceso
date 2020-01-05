import { OCCURS } from "./OCCURS";
import { BaseModel } from '../libs/base.model';

export class Reminder extends BaseModel {
    public date: string;
    public note: string;
    public frequency = OCCURS.ONCE;
    public entityID?: number;
    public entityClass?: string;
    constructor(properties?: Reminder | any) {
        super('Reminder');
        this.loadModel(properties, this);
    }
}