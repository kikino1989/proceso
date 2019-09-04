import Model from './Model';

export enum TYPES {
    RECURRENT, OCCASIONAL
}

export class Spending extends Model {

    public constructor(
        public name: string,
        public value: number,
        public type: TYPES = TYPES.RECURRENT,
        public limit?: number
    ) {
        super();
    }

    add(value: number) {
        this.value += value;
    }
}