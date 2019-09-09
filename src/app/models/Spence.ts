export const enum TYPE {
    RECURRENT = 'Recurrent', OCCASIONAL = 'Occasional'
}

export default class Spence {
    constructor(
        public id: number,
        public name: string,
        public value: number,
        public type: TYPE = TYPE.RECURRENT,
        public dueDate?: string
    ) {}
}