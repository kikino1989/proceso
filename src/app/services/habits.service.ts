import { Injectable } from '@angular/core';
import { BaseService } from '../libs/base.service';
import { Observable, of } from 'rxjs';
import { Habit } from '../models/Habit';
import { habitsRecords } from './testdata';
import { HabitsRecord } from '../models/HabitsRecord';

@Injectable({
    providedIn: 'root'
})
export class habitsService extends BaseService <Habit> {

    getHabits(): Observable<Habit[]> {
        return of(Habit.getDefaultHabits());
    }
    
    getHabitsRecord(habit: Habit) {
        return of(habitsRecords.filter(habitsRecord => {
            return habitsRecord.habitID === habit.id;
        }));
    }

    insertHabitsRecord(habitsRecord: HabitsRecord) {
        // to be implemented...
    }

    deleteHabitsRecord(habitRecordID) {
        // to be implemented...
    }
}
