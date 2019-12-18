import { BaseModel } from '../libs/base.model';

export class Prospect extends BaseModel {
    constructor(
        public name?: string,
        public phone?: string,
        public email?: string,
        public image?: string,
        public step = 0
    ) { super('Prospect'); }
}