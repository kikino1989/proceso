import { Injectable } from '@angular/core';
import { BaseService } from '../libs/base.service';
import { Reminder } from '../models/Reminer';
import { Observable, of } from 'rxjs';
import { reminders } from './testdata';

@Injectable({
  providedIn: 'root'
})
export class RemindersService extends BaseService<Reminder> {
    public getReminders(): Observable<Reminder[]> {
        return of(reminders);
    }
}
