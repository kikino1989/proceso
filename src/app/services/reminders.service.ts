import { Injectable } from '@angular/core';
import { Reminder } from '../models/Reminer';

@Injectable({
  providedIn: 'root'
})
export class RemindersService {
    private model = new Reminder();

    public getReminders(): Promise<Reminder[]> {
        return this.model.all() as Promise<Reminder[]>;
    }
}
