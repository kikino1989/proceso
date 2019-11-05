import { OCCURS } from "./OCCURS";

export class Reminder {
    public id: number;
    public date: string;
    public note: string;
    public frequency = OCCURS.ONCE;
    constructor(
        public entityId: number,
        public entityClass: string
    ) { }
}