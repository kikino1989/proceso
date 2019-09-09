import Spence from './Spence';
import IncomeSource from './IncomeSource';

export default class Budget {
    constructor(
        public id: number, 
        public goal: number,
        public name: string, 
        public incomeSources: IncomeSource[] = [],
        public spences: Spence[] = [],
        public active: boolean = false
    ) { }
}