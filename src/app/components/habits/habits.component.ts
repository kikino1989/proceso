import { Component, OnInit } from '@angular/core';
import { Habit } from '../../models/Habit';
import { Subscription } from 'rxjs';
import { habitsService } from '../../services/habits.service';
import * as _ from 'lodash';
import { ModalController } from '@ionic/angular';
import { HabitComponent } from './habit/habit.component';

@Component({
    selector: 'habits',
    templateUrl: './habits.component.html',
    styleUrls: ['./habits.component.scss'],
})
export class HabitsComponent implements OnInit {

    public habits: Habit[];
    public orgHabits: Habit[];
    private habitsSubscription: Subscription;
    constructor(
        private habitsService: habitsService,
        private modalCtrl: ModalController
    ) { }

    ngOnInit() {
        this.habitsSubscription = this.habitsService.getHabits().subscribe(habits => {
            this.habits = habits;
            this.orgHabits = _.cloneDeep(this.habits);
        });
    }

    ngOnDelete() {
        delete this.habits;
        delete this.orgHabits;
        this.habitsSubscription.unsubscribe();
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
                    this.habitsService.insert(habit);
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
                    this.habitsService.update(habit);
                }
            });
        });
    }

    viewHabitRecord(habit: Habit) {

    }
}
