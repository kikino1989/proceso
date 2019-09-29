import { Component, OnInit, Input } from '@angular/core';
import Budget from 'src/app/models/Budget';
import { Form } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import Spence from 'src/app/models/Spence';

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
