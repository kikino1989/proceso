import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Habit } from '../models/Habit';
import { HabitsRecord } from '../models/HabitsRecord';

@Injectable({
    providedIn: 'root'
})
export class habitsService {
    private model = new Habit();
    private submodel = new HabitsRecord();

    getHabits(): Promise<Habit[]> {
        return this.model.all() as Promise<Habit[]>;
    }
    
    getHabitsRecord(habit: Habit): Promise<HabitsRecord[]> {
        return new Promise((resolve) => {
            this.submodel.all().then(habitRecords => {
                resolve(habitRecords.filter((habitsRecord: HabitsRecord) => {
                    return habitsRecord.habitID === habit.id;
                }));
            });
        });
    }

    deleteHabit(habit: Habit) {
        habit.delete();
    }

    insertHabitsRecord(habitsRecord: HabitsRecord) {
        // to be implemented...
    }

    deleteHabitsRecord(habitRecordID) {
        // to be implemented...
    }
}
