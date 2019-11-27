import { Component, OnInit } from '@angular/core';
import { Reminder } from '../../models/Reminer';
import { RemindersService } from '../../services/reminders.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
    selector: 'app-reminders',
    templateUrl: './reminders.component.html',
    styleUrls: ['./reminders.component.scss'],
})
export class RemindersComponent implements OnInit {

    public reminders: Reminder[];
    private orgReminders: Reminder[];
    private remindersSubscriber: Subscription;
    constructor(private remindersService: RemindersService) { }

    ngOnInit() { 
        this.remindersSubscriber = this.remindersService.getReminders().subscribe(reminders => {
            this.orgReminders = reminders;
            this.reminders = _.cloneDeep(reminders);
        });
    }

    ngOnDelete() {
        this.remindersSubscriber.unsubscribe();
        delete this.reminders;
        delete this.orgReminders;
    }

    filterReminders(value) {
        this.reminders = this.orgReminders.filter(reminder => {
            return !value || reminder.note.toLowerCase().indexOf(value) > -1 || reminder.date.indexOf(value) > -1;
        });
    }

    dismissReminder(reminder) {
        const index = this.orgReminders.findIndex(_reminder => reminder.id === _reminder.id);
        this.reminders.splice(index, 1);
        this.orgReminders.splice(index, 1);
        this.remindersService.delete(reminder.id);
    }
}
