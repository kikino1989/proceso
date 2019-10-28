export enum OCCURS { ONCE, WEEKLY, MONTHLY, YEARLY }

export class Reminder {
    public id: number;
    public date: string;
    public note: string;
    public occurrence = OCCURS.ONCE;
    constructor(
        public entityId: number,
        public entityClass: string
    ) { }
}