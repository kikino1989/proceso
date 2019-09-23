import Spence from './Spence';
import IncomeSource from './IncomeSource';

export default class Budget {
    public id: number;
    constructor(
        public name: string, 
        public limit: number,
        public incomeSources: IncomeSource[] = [],
        public spences: Spence[] = [],
        public active: boolean = false
    ) { }
}