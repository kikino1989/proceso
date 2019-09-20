import Budget from '../models/Budget';
import IncomeSource, {TYPE as INCOME_TYPES, TYPE} from '../models/IncomeSource';
import Spence, {TYPE as SPENCE_TYPES} from '../models/Spence';

export const budgets = [
    new Budget(1, 3000, 'my budget', [new IncomeSource(1, 'job', 4000, )], [new Spence(1, 'rent', 1200, SPENCE_TYPES.OCCASIONAL)]),
    new Budget(2, 200, 'my small budget', [], [])
];