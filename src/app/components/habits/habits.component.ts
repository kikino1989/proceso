import { Component, OnInit } from '@angular/core';
import { Habit } from 'src/app/models/Habit';
import { Subscription } from 'rxjs';
import { habitsService } from 'src/app/services/habits.service';

@Component({
    selector: 'habits',
    templateUrl: './habits.component.html',
    styleUrls: ['./habits.component.scss'],
})
export class HabitsComponent implements OnInit {

    public habits: Habit[];
    private habitsSubscription: Subscription;
    constructor(private habitsService: habitsService) { }

    ngOnInit() {
        this.habitsSubscription = this.habitsService.getHabits().subscribe(habits => this.habits = habits);
    }

    ngOnDelete() {
        delete this.habits;
        this.habitsSubscription.unsubscribe();
    }
}
