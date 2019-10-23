import { ProspectingSteps } from './ProspectingSteps';

export class Prospect {
    public id: number = 0;
    constructor(
        public name: string,
        public phone: string,
        public email?: string,
        public image?: string,
        public step = 0
    ) { }
}