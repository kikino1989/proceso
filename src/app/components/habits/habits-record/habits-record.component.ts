import { Component, OnInit, Input } from '@angular/core';
import { HabitsRecord } from '../../../models/HabitsRecord';
import * as _ from 'lodash';
import moment from 'moment';
import { ModalController } from '@ionic/angular';

type Record = {date: string, done: boolean};

@Component({
    selector: 'habits-record',
    templateUrl: './habits-record.component.html',
    styleUrls: ['./habits-record.component.scss'],
})
export class HabitsRecordComponent implements OnInit {

    @Input() habitName: string;
    @Input() habitsRecords: HabitsRecord[];
    private orgRecords: Record[];
    public records: Record[];
    public from = 30;

    constructor(private modalCtrl: ModalController) {}

    ngOnInit() {
        this.buildRecords();
    }

    buildRecords() {
        this.orgRecords = [];
        for(let i = 0; i < this.from; i++) {
            let date = moment().subtract(i, 'days').format('YYYY-MM-DD');
            this.orgRecords.push({
                date,
                done: !!this.habitsRecords.filter(habitsRecord => habitsRecord.date === date).length
            });
        }
        this.records = _.cloneDeep(this.orgRecords);
    }
    
    filterHabitsRecords(date: string) {
        this.records = this.orgRecords.filter(record =>  !date || record.date.indexOf(date) > -1);
    }

    ngOnDestroy() {
        delete this.orgRecords;
        delete this.records;
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
