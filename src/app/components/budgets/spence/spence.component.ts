import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Spence} from '../../../models/Spence';
import * as _ from 'lodash';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
    selector: 'spence',
    templateUrl: './spence.component.html',
    styleUrls: ['./spence.component.scss'],
})
export class SpenceComponent implements OnInit {
    @Input() orgSpence: Spence;
    public spence: Spence;
    constructor(
        private modalCtrl: ModalController,
        private database: DatabaseService
    ) { }

    ngOnInit() {
        if (!this.orgSpence)
            this.database.openDatabase().then(db => {
                this.spence = new Spence({name: 'my spence', value: 100});
                this.spence.db = db;
            });
        else
            this.spence = _.cloneDeep(this.orgSpence);
    }

    ngOnDestroy() {
        delete this.orgSpence;
        delete this.spence;
    }

    onSubmit() {
        this.modalCtrl.dismiss(this.spence);
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
