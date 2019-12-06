import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Reminder } from 'src/app/models/Reminer';

@Component({
    selector: 'reminder',
    templateUrl: './reminder.component.html',
    styleUrls: ['./reminder.component.scss'],
})
export class ReminderComponent implements OnInit {
    @Input() reminder: Reminder;
    @Output() dismissReminder = new EventEmitter();

    constructor() { }

    ngOnInit() { }

}
