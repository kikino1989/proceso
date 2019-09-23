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
    @Input() budget: Budget;
    private spence: Spence;
    constructor(public modalCtrl: ModalController) { }

    ngOnInit() {
        this.spence = new Spence('my spence', 100);
    }

    ngOnDelete() {
        delete this.spence;
    }

    onSubmit() {
        this.budget.spences.push(this.spence);
        this.modalCtrl.dismiss(this.budget);
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
