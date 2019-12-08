import { BaseModel } from '../libs/base.model';
import { IValuable } from '../libs/IValuable';

export const enum TYPE {
    FIXED = 'Fixed', VARIABLE = 'Variable'
}

export class IncomeSource extends BaseModel implements IValuable {
    constructor(
        public name?: string,
        public value?: number,
        public type: TYPE = TYPE.FIXED,
        public date?: string
    ) { super(); }
}