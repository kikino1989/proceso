import { BaseModel } from '../libs/base.model';

export class HabitsRecord extends BaseModel {
    public habitID: number;
    public date: string;
    constructor(properties?: HabitsRecord | any) {
        super('HabitsRecord');
        if (properties) {
            this.loadModel(properties, this);
        }
    }
}