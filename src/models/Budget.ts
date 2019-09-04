import Model from './Model';
import {Spending} from './Spending';
import IncomeSource from './IncomeSource';

export default class Budget extends Model {
    public constructor(
        public name: string,
        public goal: number,
        public spendings: Spending[] = [],
        public incomeSources: IncomeSource[] = []
    ) {
        super();
    }
}