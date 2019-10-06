import Spence from './Spence';
import IncomeSource from './IncomeSource';

export enum DAYS {
    FIRST = "1st of the month",
    SECOND = "2nd of the month",
    THIRD = "3rd of the month",
    FORTH = "4th of the month",
    FIFTH = "5th of the month",
    SIXTH = "6th of the month",
    SEVENTH = "7th of the month",
    EIGHTH = "8th of the month",
    NINTH = "9th of the month",
    TENTH = "10th of the month",
    ELEVENTH = "11th of the month",
    TWELFTH = "12th of the month",
    THIRTEENTH = "13th of the month",
    FORTEENTH = "14th of the month",
    FIFTEENTH = "15th of the month",
    SIXTEENTH = "16th of the month",
    SEVENTEENTH = "17th of the month",
    EIGHTEENTH = "18th of the month",
    NINTEENTH = "19th of the month",
    TWENTIETH = "20th of the month",
    TWENTYFIRST = "21st of the month",
    TWENTYSECOND = "22nd of the month",
    TWENTYTHIRD = "23rd of the month",
    TWENYFORTH = "24th of the month",
    TWENTYFIFTH = "25th of the month",
    TWENTYSIXTH = "26th of the month",
    TWENTYSEVENTH = "27th of the month",
    TWENTYEIGHTH = "28th of the month" 
};

export default class Budget {
    public id: number = 1;
    constructor(
        public name: string, 
        public limit: number,
        public incomeSources: IncomeSource[] = [],
        public spences: Spence[] = [],
        public active: boolean = false,
        public startDate = DAYS.FIRST,
        public snapshot: string | false = false,
        public parentID?: number
    ) { }

    get totalIncome(): number {
        return this.getTotal(this.incomeSources);
    }

    get totalSpending(): number {
        return this.getTotal(this.spences);
    }

    getTotal(entities: {value: number}[]): number {
        if (entities.length)
            return entities.map(entity => entity.value)
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

}