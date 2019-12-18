import { Injectable } from '@angular/core';
import { Reminder } from '../models/Reminer';
import { DBService } from './DBService';

@Injectable({
  providedIn: 'root'
})
export class RemindersService extends DBService {
    private model = new Reminder();

    public getReminders(): Promise<Reminder[]> {
        return this.database.dbReady.toPromise().then(() => {
            return this.model.all() as Promise<Reminder[]>;
        });
    }
}
