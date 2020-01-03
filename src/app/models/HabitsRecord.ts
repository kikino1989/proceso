import { BaseModel } from '../libs/base.model';

export class HabitsRecord extends BaseModel {
    public habitID: number;
    public date: string;
    constructor(properties?: HabitsRecord | any) {
        super('HabitsRecord');
        this.loadModel(properties);
    }
}