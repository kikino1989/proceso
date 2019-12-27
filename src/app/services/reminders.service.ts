import { Injectable } from '@angular/core';
import { Reminder } from '../models/Reminer';
import { DBService } from '../libs/DBService';

@Injectable({
  providedIn: 'root'
})
export class RemindersService extends DBService {
    
    init() {
        this.model = new Reminder();
    }

    public getReminders(): Promise<Reminder[]> {
        return this.model.all() as Promise<Reminder[]>;
    }
}
