import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Habit } from '../models/Habit';
import { HabitsRecord } from '../models/HabitsRecord';
import { DBService } from './DBService';

@Injectable({
    providedIn: 'root'
})
export class habitsService extends DBService {
    private model = new Habit();
    private submodel = new HabitsRecord();

    getHabits(): Promise<Habit[]> {
        return this.model.all() as Promise<Habit[]>;
    }
    
    getHabitsRecord(habit: Habit): Promise<HabitsRecord[]> {
        return this.database.dbReady.toPromise().then(() => {
            return this.submodel.all({habitID: habit.id});
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
