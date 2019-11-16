import { OCCURS } from './OCCURS';
import moment from 'moment';

export enum HABITS_STATUS { STARTED = "STARTED", IN_PROGRESS = "IN PROGRESS", CREATE = "CREATE", BROKEN = "BROKEN", PERFECT = "PERFECT" }
const idTracker = { trackIds: 0 }; // temp
export class Habit {
    public id: number = idTracker.trackIds;
    public done: false;
    constructor(
        public name: string,
        public timeGoal?: number,
        public description?: string, 
        public frequency = OCCURS.DAILY,
        public dueDate = moment().format("MM/DD/YYYY")
    ) { idTracker.trackIds++ }

    static getDefaultHabits(): Habit[] {
        return <Habit[]> [
            new Habit(
                "Listen to Audio",
                30
            ),
            new Habit(
                "Reed",
                15
            ),
            new Habit(
                "Use Products",
            ),
            new Habit(
                "Consultation Upline/Downline",
                15
            ),
            new Habit(
                "Create Relationships.",
                60
            ),
            new Habit(
                "Share Story/Recruit.",
                60
            )
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

    get time(): string {
        if (!this.timeGoal)
            return "";
        if (this.timeGoal < 60)
            return `${this.timeGoal} Minutes`;
        
        const mins = this.timeGoal % 60;
        return `${this.timeGoal / 60}:${mins || "00"} Hours`;
    }
}