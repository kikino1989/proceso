import {Budget} from '../models/Budget';
import {IncomeSource, TYPE as INCOME_TYPES, TYPE} from '../models/IncomeSource';
import {Spence, TYPE as SPENCE_TYPES} from '../models/Spence';
import { Prospect } from '../models/Prospect';
import { Reminder } from '../models/Reminer';
import { OCCURS } from '../models/OCCURS';
import { HabitsRecord } from '../models/HabitsRecord';

export const budgets = [
    new Budget('my budget', 3000, [new IncomeSource('job', 4000, )], [new Spence('rent', 1200, SPENCE_TYPES.OCCASIONAL)], true)
];

export const prospects = [
    {id: 1, name: 'bil neits', phone: '7867097661', email: 'kikino1989@gmial.com', step: 0},
    {id: 2, name: 'jonny kage', phone: '7867097661', email: 'kikino1989@yahoo.com', step: 1}
];

export const reminders: Reminder[] = [
    {id: 1, date: "10/20/1989", note: "I was borned.", entityId: 1, entityClass: "Prospect", frequency: OCCURS.ONCE}
];

export const habitsRecords: HabitsRecord[] = [
    {id: 1, habitID: 1, date: '2019-11-19'},
    {id: 2, habitID: 1, date: '2019-11-18'},
    {id: 3, habitID: 1, date: '2019-11-17'},
    {id: 4, habitID: 1, date: '2019-11-16'}
];
