import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {Spence} from '../../../models/Spence';
import * as _ from 'lodash';

@Component({
    selector: 'spence',
    templateUrl: './spence.component.html',
    styleUrls: ['./spence.component.scss'],
})
export class SpenceComponent implements OnInit {
    @Input() orgSpence: Spence;
    public spence: Spence;
    constructor(public modalCtrl: ModalController) { }

    ngOnInit() {
        if (!this.orgSpence)
            this.spence = new Spence('my spence', 100);
        else
            this.spence = _.cloneDeep(this.orgSpence);
    }

    ngOnDelete() {
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
