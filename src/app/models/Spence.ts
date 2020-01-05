import { BaseModel } from '../libs/base.model';
import { IValuable } from '../libs/IValuable';

export const enum TYPE {
    RECURRENT = 'Recurrent', OCCASIONAL = 'Occasional'
}

export class Spence extends BaseModel implements IValuable {
    public name: string;
    public value: number;
    public type: TYPE = TYPE.RECURRENT;
    public dueDate?: string;
    public _limit?: number;
    constructor(properties?: Spence | any) {
        super('Spence');
        this.loadModel(properties, this);
    }
}