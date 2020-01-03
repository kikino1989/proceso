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
export class HabitsComponent implements OnInit {

    public habits: Habit[];
    public orgHabits: Habit[];
    constructor(
        private habitsService: habitsService,
        private modalCtrl: ModalController
    ) { }

    ngOnInit() {
        this.habitsService.waitForDatabase(() => {
            this.habitsService.getHabits().then(habits => {
                this.habits = habits;
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
        this.habitsService.waitForDatabase(() => {
            this.habitsService.deleteHabit(habit);
            this.deleteHabitRecords(habit);
        });
    }

    changeHabit(habit) {
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
        this.habitsService.waitForDatabase(() => {
            this.habitsService.getHabitsRecord(habit).then(habitsRecords => {
                const habitRecord = new HabitsRecord({
                    habitID: habit.id,
                    date: moment().format('YYYY-MM-DD')
                });
                habitsRecords.push(habitRecord);
                this.habitsService.insertHabitsRecord(habitRecord);
            });
        });
    }

    deleteHabitRecord(habit: Habit) {
        this.habitsService.waitForDatabase(() => {
            this.habitsService.getHabitsRecord(habit).then(habitsRecords => {
                const index = habitsRecords.findIndex(habitsRecord => {
                    return habitsRecord.habitID === habit.id && habitsRecord.date === moment().format('YYYY-MM-DD');
                });
                if (index > -1) {
                    const habitsRecord = habitsRecords.splice(index, 1)[0];
                    this.habitsService.deleteHabitsRecord(habitsRecord.id);
                }
            });
        });
    }

    
    deleteHabitRecords(habit: Habit) {

    }
}
