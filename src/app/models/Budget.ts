import Spence from './Spence';
import IncomeSource from './IncomeSource';

export enum DAYS {
    FIRST = "1ST of the month",
    SECOND = "2ND of the month",
    THIRD = "3RD of the month",
    FORTH = "4TH of the month",
    FIFTH = "5TH of the month",
    SIXTH = "6TH of the month",
    SEVENTH = "7TH of the month",
    EIGHTH = "8TH of the month",
    NINTH = "9TH of the month",
    TENTH = "10TH of the month",
    ELEVENTH = "11TH of the month",
    TWELFTH = "12TH of the month",
    THIRTEENTH = "13TH of the month",
    FORTEENTH = "14TH of the month",
    FIFTEENTH = "15TH of the month",
    SIXTEENTH = "16TH of the month",
    SEVENTEENTH = "17TH of the month",
    EIGHTEENTH = "18TH of the month",
    NINTEENTH = "19TH of the month",
    TWENTIETH = "20TH of the month",
    TWENTYFIRST = "21RST of the month",
    TWENTYSECOND = "22ND of the month",
    TWENTYTHIRD = "23RD of the month",
    TWENYFORTH = "24TH of the month",
    TWENTYFIFTH = "25TH of the month",
    TWENTYSIXTH = "26TH of the month",
    TWENTYSEVENTH = "27TH of the month",
    TWENTYEIGHTH = "28TH of the month" 
};

export default class Budget {
    public id: number;
    constructor(
        public name: string, 
        public limit: number,
        public incomeSources: IncomeSource[] = [],
        public spences: Spence[] = [],
        public active: boolean = false,
        public startDate = DAYS.FIRST,
        public snapshot = false
    ) { }
}