import { Injectable } from '@angular/core';
import { Habit } from '../models/Habit';
import { HabitsRecord } from '../models/HabitsRecord';
import { DBService } from '../libs/DBService';
import moment from 'moment';

@Injectable({
    providedIn: 'root'
})
export class habitsService extends DBService {

    init() {
        this.model = new Habit();
        this.submodel = new HabitsRecord();
    }

    getHabits(): Promise<Habit[]> {
        return this.model.all().then(habits => {
            habits.forEach(habit => {
                (habit as Habit).loadDone();
            });
            return habits;
        }) as Promise<Habit[]>;
    }
    
    getHabitsRecord(habit: Habit): Promise<HabitsRecord[]> {
        return this.submodel.all({habitID: habit.id}) as Promise<HabitsRecord[]>;
    }

    insertHabitsRecord(habitsRecord: HabitsRecord) {
        this.waitForDatabase(db => {
            habitsRecord.db = db;
            habitsRecord.insert();
        });
    }

    deleteHabitsRecord(habitID) {
        this.waitForDatabase(db => {
            db.executeSql("DELETE FROM HabitsRecord WHERE habitID = ? AND date = ?", [habitID, moment().format('MM-DD-YYYY')])
        });
    }
}
