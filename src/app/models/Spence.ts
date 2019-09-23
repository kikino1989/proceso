export const enum TYPE {
    RECURRENT = 'Recurrent', OCCASIONAL = 'Occasional'
}

export default class Spence {
    public id: number;
    constructor(
        public name: string,
        public value: number,
        public type: TYPE = TYPE.RECURRENT,
        public dueDate?: string,
        public limit?: number
    ) {}
}