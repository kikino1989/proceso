import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Prospect } from '../../../models/Prospect';
import { ProspectingSteps } from '../../../models/ProspectingSteps';
import * as _  from 'lodash';
import { Reminder } from '../../../models/Reminer';
import { OCCURS } from '../../../models/OCCURS';
import { DatabaseService } from '../../../services/database.service';
import { PhoteService } from 'src/app/services/phote.service';

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
        private database: DatabaseService,
        private photoService: PhoteService
    ) { }

    ngOnInit() {
        if (this.orgProspect)
            this.prospect = _.cloneDeep(this.orgProspect);
        else
            this.database.openDatabase().then(db => {
                this.prospect = new Prospect();
                this.prospect.db = db;
            });

        this.database.openDatabase().then(db => {
            this.reminder = new Reminder({entityID: this.prospect.id, entityClass: 'Prospect'});
            this.reminder.db = db;
        });
    }

    ngOnDestroy() {
        delete this.orgProspect;
        delete this.prospectingSteps;
        delete this.prospect;
        delete this.reminder;
    }

    onSubmit() {
        this.modalCtrl.dismiss({prospect: this.prospect, reminder: this.reminder});
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }

    get occurs() {
        return Object.keys(OCCURS as object);
    }

    getImage() {
        this.photoService.takePicture().then(image => {
            console.log('this is image', image);
        });
    }
}
