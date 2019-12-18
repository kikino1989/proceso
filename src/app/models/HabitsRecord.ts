import { BaseModel } from '../libs/base.model';

export class HabitsRecord extends BaseModel {
    constructor(
        public habitID?: number,
        public date?: string
    ) { super('HabitsRecord'); }
}