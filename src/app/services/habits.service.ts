import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Habit } from '../models/Habit';
import { HabitsRecord } from '../models/HabitsRecord';
import { DBService } from '../libs/DBService';

@Injectable({
    providedIn: 'root'
})
export class habitsService extends DBService {

    init() {
        this.model = new Habit();
        this.submodel = new HabitsRecord();
    }

    getHabits(): Promise<Habit[]> {
        return this.model.all() as Promise<Habit[]>;
    }
    
    getHabitsRecord(habit: Habit): Promise<HabitsRecord[]> {
        return this.submodel.all({habitID: habit.id}) as Promise<HabitsRecord[]>;
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
