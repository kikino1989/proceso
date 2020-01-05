import { BaseModel } from '../libs/base.model';

export class Prospect extends BaseModel {
    public name: string;
    public phone: string;
    public email?: string;
    public image?: string;
    public step = 0;
    constructor(properties?: Prospect | any) {
        super('Prospect');
        this.loadModel(properties, this);
    }
}