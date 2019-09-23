import Budget from '../models/Budget';
import IncomeSource, {TYPE as INCOME_TYPES, TYPE} from '../models/IncomeSource';
import Spence, {TYPE as SPENCE_TYPES} from '../models/Spence';

export const budgets = [
    new Budget('my budget', 3000, [new IncomeSource('job', 4000, )], [new Spence('rent', 1200, SPENCE_TYPES.OCCASIONAL)], true),
    new Budget('my small budget', 200, [], [])
];