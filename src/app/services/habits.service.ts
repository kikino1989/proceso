import { Injectable } from '@angular/core';
import { BaseService } from '../libs/base.service';
import { Observable, of } from 'rxjs';
import { ProspectingSteps } from '../models/ProspectingSteps';
import { Habit } from '../models/Habit';

@Injectable({
    providedIn: 'root'
})
export class habitsService extends BaseService <Habit> {

    getHabits(): Observable<Habit[]> {
        return of(Habit.getDefaultHabits());
    }
    
}
