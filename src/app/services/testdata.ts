import {Budget} from '../models/Budget';
import {IncomeSource, TYPE as INCOME_TYPES, TYPE} from '../models/IncomeSource';
import {Spence, TYPE as SPENCE_TYPES} from '../models/Spence';
import { Prospect } from '../models/Prospect';

export const budgets = [
    new Budget('my budget', 3000, [new IncomeSource('job', 4000, )], [new Spence('rent', 1200, SPENCE_TYPES.OCCASIONAL)], true)
];

export const prospects = [
    new Prospect('bil neits', '7867097661', 'kikino1989@gmial.com'),
    new Prospect('jonny kage', '7867097661', 'kikino1989@yahoo.com')
]