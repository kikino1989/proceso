import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Prospect } from '../../../models/Prospect';
import { ProspectingSteps } from '../../../models/ProspectingSteps';
import * as _  from 'lodash';
import { Reminder } from '../../../models/Reminer';
import { RemindersService } from '../../../services/reminders.service';

@Component({
    selector: 'prospect',
    templateUrl: './prospect.component.html',
    styleUrls: ['./prospect.component.scss'],
})
export class ProspectComponent implements OnInit {

    @Input() orgProspect?: Prospect;
    @Input() prospectingSteps: ProspectingSteps;
    public prospect: Prospect;
    public reminder?: Reminder;
    constructor(
        private modalCtrl: ModalController,
        private reminderService: RemindersService
    ) { }

    ngOnInit() {
        this.reminder = new Reminder(this.prospect.id, Prospect.name);
        if (this.orgProspect)
            this.prospect = _.cloneDeep(this.orgProspect);
        else
            this.prospect = new Prospect("", "");
    }

    ngOnDelete() {
        delete this.orgProspect;
        delete this.prospectingSteps;
        delete this.prospect;
        delete this.reminder;
    }

    onSubmit() {
        if (this.reminder.note && this.reminder.date)
            this.reminderService.insert(this.reminder);
        this.modalCtrl.dismiss(this.prospect);
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
