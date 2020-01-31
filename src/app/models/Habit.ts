import { OCCURS } from './OCCURS';
import moment from 'moment';
import { BaseModel } from '../libs/base.model';
import { HabitsRecord } from './HabitsRecord';

export enum HABITS_STATUS { STARTED = "STARTED", IN_PROGRESS = "IN PROGRESS", CREATE = "CREATE", BROKEN = "BROKEN", PERFECT = "PERFECT" }

export class Habit extends BaseModel {
    public name: string;
    public timeGoal: number;
    public description?: string;
    public frequency = OCCURS.DAILY;
    public dueDate = moment().format("MM-DD-YYYY");
    public done = false;
    private static habitRecordModel = new HabitsRecord();
    
    constructor(properties?: Habit | any) {
        super('Habit');
        this.excludedFields = [...this.excludedFields, ...['done']];
        if (properties) {
            this.loadModel(properties, this);
        }
    }

    async loadDone() {
        this.done = await this.getDone();
        return this;
    }

    static getDefaultHabits(): Habit[] {
        return [
            new Habit({
                name: "Listen to Audio",
                timeGoal: 30
            }),
            new Habit({
                name: "Reed",
                timeGoal: 15
            }),
            new Habit({
                name: "Use Products",
            }),
            new Habit({
                name: "Consultation Upline/Downline",
                timeGoal: 15
            }),
            new Habit({
                name: "Create Relationships.",
                timeGoal: 60
            }),
            new Habit({
                name: "Share Story/Recruit.",
                timeGoal: 60
            })
        ];
    }

    async getDone() {
        Habit.habitRecordModel.db = this.db;
        return !!(await Habit.habitRecordModel.all({habitID: this.id, date: moment().format("MM-DD-YYYY")})).length;
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