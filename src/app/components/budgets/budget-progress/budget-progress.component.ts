import { Component, OnInit, Input } from '@angular/core';
import Budget from 'src/app/models/Budget';

@Component({
    selector: 'budget-progress',
    templateUrl: './budget-progress.component.html',
    styleUrls: ['./budget-progress.component.scss'],
})
export class BudgetProgressComponent implements OnInit {
    @Input() budget: Budget;
    constructor() { }

    ngOnInit() {}

    get totalSpending():number {
        return this.budget.spences.map(spence => spence.value).reduce((prev, cur) => prev + cur);
    }

    get spendingColor(): string {
        const spendingPorcentage = this.spendingBarWidth;
        if (spendingPorcentage < 50) return 'great';
        else if (spendingPorcentage < 60) return 'good';
        else if (spendingPorcentage < 70) return 'careful';
        else if (spendingPorcentage >= 70) return 'bad';

        return 'secondary';
    }

    get spendingBarWidth(): number {
        return (this.totalSpending / this.budget.limit) * 100;
    }

}
