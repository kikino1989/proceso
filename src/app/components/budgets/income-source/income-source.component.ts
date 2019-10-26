import { Component, OnInit, Input } from '@angular/core';
import { IncomeSource } from '../../../models/IncomeSource';
import { ModalController } from '@ionic/angular';
import * as _ from 'lodash';

@Component({
    selector: 'income-source',
    templateUrl: './income-source.component.html',
    styleUrls: ['./income-source.component.scss'],
})
export class IncomeSourceComponent implements OnInit {
    @Input() orgIncomeSource?: IncomeSource;
    public incomeSource: IncomeSource;
    constructor(public modalCtrl: ModalController) { }

    ngOnInit() {
        if (!this.orgIncomeSource)
            this.incomeSource = new IncomeSource('my income source', 100);
        else
            this.incomeSource = _.cloneDeep(this.orgIncomeSource);
    }

    ngOnDelete() {
        delete this.orgIncomeSource;
        delete this.incomeSource;
    }

    onSubmit() {
        this.modalCtrl.dismiss(this.incomeSource);
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
