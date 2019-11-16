import { Component, OnInit } from '@angular/core';
import { Habit } from 'src/app/models/Habit';
import { Subscription } from 'rxjs';
import { habitsService } from 'src/app/services/habits.service';
import * as _ from 'lodash';

@Component({
    selector: 'habits',
    templateUrl: './habits.component.html',
    styleUrls: ['./habits.component.scss'],
})
export class HabitsComponent implements OnInit {

    public habits: Habit[];
    public orgHabits: Habit[];
    private habitsSubscription: Subscription;
    constructor(private habitsService: habitsService) { }

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
}
