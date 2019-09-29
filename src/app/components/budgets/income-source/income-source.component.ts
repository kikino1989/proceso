import { Component, OnInit, Input } from '@angular/core';
import Budget from 'src/app/models/Budget';
import { Form } from '@angular/forms';
import IncomeSource from 'src/app/models/IncomeSource';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'income-source',
    templateUrl: './income-source.component.html',
    styleUrls: ['./income-source.component.scss'],
})
export class IncomeSourceComponent implements OnInit {
    @Input() incomeSource?: IncomeSource;
    constructor(public modalCtrl: ModalController) { }

    ngOnInit() {
        if (!this.incomeSource)
            this.incomeSource = new IncomeSource('my income source', 100);
    }

    ngOnDelete() {
        delete this.incomeSource;
    }

    onSubmit() {
        this.modalCtrl.dismiss(this.incomeSource);
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
