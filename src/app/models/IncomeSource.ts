export const enum TYPE {
    FIXED = 'Fixed', VARIABLE = 'Variable'
}

export class IncomeSource {
    public id: number;
    constructor(
        public name: string,
        public value: number,
        public type: TYPE = TYPE.FIXED,
        public date?: string
    ) { }
}