import {Spence, TYPE as SPTYPES } from './Spence';
import {IncomeSource, TYPE as INTYPES}  from './IncomeSource';
import { DAYS } from './DAYS';
import { BaseModel } from '../libs/base.model';
import { IValuable } from '../libs/IValuable';

export class Budget extends BaseModel {
    constructor(
        public name?: string, 
        public limit?: number,
        public incomeSources: IncomeSource[] = [],
        public spences: Spence[] = [],
        public active: boolean = false,
        public startDate = DAYS.FIRST,
        public snapshot: string | false = false,
        public parentID?: number
    ) { super(); }

    get totalIncome(): number {
        return this.getTotal(this.incomeSources);
    }

    get totalSpending(): number {
        return this.getTotal(this.spences);
    }

    get profit() {
        if (!this.totalIncome)
            return 0;
        return this.totalIncome - this.totalSpending;
    }

    get yearProfic() {
        return this.profit * 12;
    }

    get energencyFundTime() {
        return Math.ceil(1000 / this.profit);
    }

    get fullyFundedEmergencyFund() {
        return this.totalSpending * 3;
    }

    get fullyFundedEmergencyFundTime() {
        return this.fullyFundedEmergencyFund / this.profit;
    }

    getTotal(entities: IValuable[]): number {
        if (entities.length)
            return entities
                    .map(entity => entity.value)
                    .reduce((value, cur) => (value + cur));
        return 0;
    }

    get status() {
        const spendingPorcentage = (this.totalSpending / this.totalIncome) * 100;
        if (spendingPorcentage < 50) return 'great';
        else if (spendingPorcentage < 70) return 'good';
        else if (spendingPorcentage < 85) return 'careful';
        else if (spendingPorcentage >= 85) return 'bad';

        return 'secondary';
    }

    reset() {
        this.incomeSources.forEach(incomeSource => {
            if (incomeSource.type === INTYPES.VARIABLE) {
                incomeSource.value = 0;
            }
        });
        this.spences.forEach(spence => {
            if (spence.type === SPTYPES.OCCASIONAL) {
                spence.value = 0;
            }
        })
    }
}