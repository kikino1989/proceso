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
    @Input() spence: Spence;
    constructor(public modalCtrl: ModalController) { }

    ngOnInit() {
        if (!this.spence)
            this.spence = new Spence('my spence', 100);
        else
            this.spence = _.cloneDeep(this.spence);
    }

    ngOnDelete() {
        delete this.spence;
    }

    onSubmit() {
        this.modalCtrl.dismiss(this.spence);
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
