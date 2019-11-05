import { OCCURS } from './OCCURS';
import moment from 'moment';

export enum HABITS_STATUS { STARTED = "STARTED", IN_PROGRESS = "IN PROGRESS", CREATE = "CREATE", BROKEN = "BROKEN", PERFECT = "PERFECT" }

export class Habit {
    public id: number;

    constructor(
        public name: string,
        public timeGoal?: number,
        public frequency = OCCURS.DAILY,
        public dueDate = moment().format("MM/DD/YYYY")
    ) { }

    static getDefaultHabits() {
        return <Habit[]> [
            {
                id: 1,
                name: "Listen to Audio",
                timeGoal: 30,
                frequency: OCCURS.DAILY,
                dueDate: moment().format("MM/DD/YYYY")
            },
            {
                id: 2,
                name: "Reed",
                timeGoal: 15,
                frequency: OCCURS.DAILY,
                dueDate: moment().format("MM/DD/YYYY")
            },
            {
                id: 3,
                name: "Use Products",
                frequency: OCCURS.DAILY,
                dueDate: moment().format("MM/DD/YYYY")
            },
            {
                id: 4,
                name: "Consultation Upline/Downline",
                timeGoal: 15,
                frequency: OCCURS.WEEKLY,
                dueDate: moment().format("ddd")
            },
            {
                id: 5,
                name: "Create Relationships.",
                timeGoal: 60,
                frequency: OCCURS.DAILY,
                dueDate: moment().format("MM/DD/YYYY")
            },
            {
                id: 6,
                name: "Share Story/Recruit.",
                timeGoal: 60,
                frequency: OCCURS.DAILY,
                dueDate: moment().format("MM/DD/YYYY")
            }
        ];
    }

    get weekProgress() {
        return; // to be implemeted
    }

    get monthProgress() {
        return; // to be implemented
    }

    get status() {
        return; // to be implemented
    }
}