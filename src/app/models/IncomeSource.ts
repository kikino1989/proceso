export const enum TYPE {
    FIXED = 'Fixed', VARIABLE = 'Variable'
}

export default class IncomeSource {
    constructor(
        public id: number,
        public name: string,
        public value: number,
        public type: TYPE = TYPE.FIXED,
        public date?: string
    ) {}
}