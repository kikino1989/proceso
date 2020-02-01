import { BaseModel } from '../libs/base.model';
import { IValuable } from '../libs/IValuable';
import moment from 'moment';

export const enum TYPE {
    RECURRENT = 'Recurrent', OCCASIONAL = 'Occasional'
}

export class Spence extends BaseModel implements IValuable {
    public budgetID: number;
    public name: string;
    public value: number;
    public type: TYPE = TYPE.RECURRENT;
    public dueDate: string = moment().format('YYYY-MM-DD');
    public _limit?: number;
    constructor(properties?: Spence | any) {
        super('Spence');
        if (properties) {
            this.loadModel(properties, this);
        }
    }
}