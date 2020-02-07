import {Spence, TYPE as SPTYPES } from './Spence';
import {IncomeSource, TYPE as INTYPES}  from './IncomeSource';
import { DAYS } from './DAYS';
import { BaseModel } from '../libs/base.model';
import { IValuable } from '../libs/IValuable';

export class Budget extends BaseModel {
    public name: string;
    public _limit: number;
    public incomeSources: IncomeSource[] = [];
    public spences: Spence[] = [];
    public active: boolean = false;
    public startDate = DAYS.FIRST;
    public snapshot?: string;
    public parentID?: number;
    constructor(properties?: Budget | any, public _loadDeps = true) {
        super('Budget');
        this.dependencies = [
            {propertyName: 'incomeSources', tableName: 'IncomeSource', classRef: new IncomeSource()},
            {propertyName: 'spences', tableName: 'Spence', classRef: new Spence()}
        ];
        this.dependencyForeignKey = 'budgetID';
        if (properties) {
            this.loadModel(properties, this);
        }
    }

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

    get yearlyProfit() {
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
                incomeSource.update();
            }
        });
        this.spences.forEach(spence => {
            if (spence.type === SPTYPES.OCCASIONAL) {
                spence.value = 0;
                spence.update();
            }
        });
    }

    reassignDependencies() {
        this.spences.forEach(spence => {
            spence.budgetID = this.id;
            spence.id = null;
        });
        this.incomeSources.forEach(source => {
            source.budgetID = this.id;
            source.id = null;
        });
    }

    delete() {
        return super.delete().then(() => {
            return this.db.executeSql(`DELETE FROM Budget WHERE parent_id = ? `, [this.id])
        });
    }
}