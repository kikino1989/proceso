import { Component, OnInit, Input } from '@angular/core';
import { IncomeSource } from '../../../models/IncomeSource';
import { ModalController } from '@ionic/angular';
import * as _ from 'lodash';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
    selector: 'income-source',
    templateUrl: './income-source.component.html',
    styleUrls: ['./income-source.component.scss'],
})
export class IncomeSourceComponent implements OnInit {
    @Input() orgIncomeSource?: IncomeSource;
    public incomeSource: IncomeSource;
    constructor(
        private modalCtrl: ModalController,
        private database: DatabaseService
    ) { }

    ngOnInit() {
        if (!this.orgIncomeSource)
            this.database.openDatabase().then(db => {
                this.incomeSource = new IncomeSource({name: 'my income source', value: 100});
                this.incomeSource.db = db;
            });
        else
            this.incomeSource = _.cloneDeep(this.orgIncomeSource);
    }

    ngOnDestroy() {
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
