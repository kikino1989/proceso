import { BaseModel } from '../libs/base.model';
import { IValuable } from '../libs/IValuable';
import moment from 'moment';

export const enum TYPE {
    FIXED = 'Fixed', VARIABLE = 'Variable'
}

export class IncomeSource extends BaseModel implements IValuable {
    budgetID: number;
    public name: string;
    public value: number;
    public type: TYPE = TYPE.FIXED;
    public date: string = moment().format('YYYY-MM-DD');
    constructor(properties?: IncomeSource | any) {
        super('IncomeSource');
        if (properties) {
            this.loadModel(properties, this);
        }
    }
}