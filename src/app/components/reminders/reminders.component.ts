import { Component, OnInit } from '@angular/core';
import { Reminder } from '../../models/Reminer';
import { RemindersService } from '../../services/reminders.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-reminders',
    templateUrl: './reminders.component.html',
    styleUrls: ['./reminders.component.scss'],
})
export class RemindersComponent implements OnInit {

    public reminders: Reminder[];
    private orgReminders: Reminder[];
    constructor(private remindersService: RemindersService) { }

    ngOnInit() { 
        this.remindersService.getReminders().then(reminders => {
            this.orgReminders = reminders;
            this.reminders = _.cloneDeep(reminders);
        });
    }

    ngOnDelete() {
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
        reminder.delete();
    }
}
