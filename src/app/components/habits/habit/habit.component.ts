import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Habit } from '../../../models/Habit';
import * as _ from 'lodash';
import { OCCURS } from '../../../models/OCCURS';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
    selector: 'habit',
    templateUrl: './habit.component.html',
    styleUrls: ['./habit.component.scss'],
})
export class HabitComponent implements OnInit {

    @Input() orgHabit?: Habit;
    public habit: Habit;
    public frequencies = Object.values(OCCURS as object);
    constructor(
        private modalCtrl: ModalController,
        private database: DatabaseService
    ) { }

    ngOnInit() { 
        if (this.orgHabit) {
            this.habit = _.cloneDeep(this.orgHabit);
        } else {
            this.database.openDatabase().then(db => {
                this.habit = new Habit({name: 'My Habit'});
                this.habit.db = db;
            });
        }
    }

    ngOnDestroy() {
        delete this.habit;
        delete this.orgHabit;
        delete this.frequencies;
    }

    onSubmit() {
        this.modalCtrl.dismiss(this.habit);
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
