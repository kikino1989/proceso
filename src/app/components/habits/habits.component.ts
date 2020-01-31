import { Component, OnInit } from '@angular/core';
import { Habit } from '../../models/Habit';
import { habitsService } from '../../services/habits.service';
import * as _ from 'lodash';
import { ModalController } from '@ionic/angular';
import { HabitComponent } from './habit/habit.component';
import { HabitsRecordComponent } from './habits-record/habits-record.component';
import { HabitsRecord } from '../../../app/models/HabitsRecord';
import moment from 'moment';

@Component({
    selector: 'habits',
    templateUrl: './habits.component.html',
    styleUrls: ['./habits.component.scss'],
})
export class HabitsComponent {

    public habits: Habit[];
    public orgHabits: Habit[];
    constructor(
        private habitsService: habitsService,
        private modalCtrl: ModalController
    ) { }

    ionViewWillEnter() {
        this.habitsService.waitForDatabase(() => {
            this.habitsService.getHabits().then(async habits => {
                this.habits = habits;
                for (let i = 0; i < this.habits.length; i++) {
                    await habits[i].loadDone();
                }
                this.orgHabits = _.cloneDeep(this.habits);
            });
        });
    }

    ngOnDestroy() {
        delete this.habits;
        delete this.orgHabits;
    }

    filterHabits(value: string) {
        this.habits = this.orgHabits.filter(habit => {
            return habit.description && habit.description.toLowerCase().indexOf(value) > -1 ||
                    habit.name.toLowerCase().indexOf(value) > -1;
        });
    }

    addHabit() {
        this.modalCtrl.create({
            component: HabitComponent
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then(({data: habit}) => {
                if (habit) {
                    this.habits.push(habit);
                    this.orgHabits.push(_.cloneDeep(habit));
                    habit.insert();
                }
            });
        });
    }

    editHabit(habit: Habit) {
        this.modalCtrl.create({
            component: HabitComponent,
            componentProps: {
                orgHabit: habit
            }
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then(({data}) => {
                if (data) {
                    for(let prop in data) {
                        if (habit.hasOwnProperty(prop))
                            habit[prop] = data[prop];
                    }
                    habit.update();
                }
            });
        });
    }

    deleteHabit(habit: Habit) {
        const index = this.habits.findIndex(_habit => {
            return habit.id === _habit.id;
        });
        this.habits.splice(index, 1);
        this.orgHabits.splice(index, 1);
        habit.delete();
    }

    changeHabit(habit: Habit) {
        // habit.done = !habit.done;
        console.log('is it done::', habit.done)
        if (habit.done)
            this.addHabitRecord(habit);
        else
            this.deleteHabitRecord(habit);
    }

    viewHabitRecords(habit: Habit) {
        this.habitsService.waitForDatabase(() => {
            this.habitsService.getHabitsRecord(habit).then(habitsRecords => {
                this.modalCtrl.create({
                    component: HabitsRecordComponent,
                    componentProps: {
                        habitName: habit.name,
                        habitsRecords
                    }
                }).then(modal => {
                    modal.present();
                });
            });
        });
    }

    addHabitRecord(habit: Habit) {
        this.habitsService.insertHabitsRecord(new HabitsRecord({
            habitID: habit.id,
            date: moment().format('MM-DD-YYYY')
        }));
    }

    deleteHabitRecord(habit: Habit) {
        this.habitsService.deleteHabitsRecord(habit.id);
    }
}
