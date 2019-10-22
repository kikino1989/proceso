import { ProspectingSteps } from './ProspectingSteps';

export class Prospect {
    id: number;
    constructor(
        public name: string,
        public phone: string,
        public email?: string,
        public image?: string,
        public step = 0
    ) { }
}