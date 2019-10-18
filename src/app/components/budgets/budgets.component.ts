import { Component } from '@angular/core';
import {BudgetsService} from '../../services/budgets.service';
import {Budget} from '../../models/Budget';
import {budgets} from '../../services/testdata';

@Component({
    selector: 'budgets',
    templateUrl: 'budgets.component.html',
    styleUrls: ['budgets.component.scss']
})
export class BudgetsComponent {
    public budgets: Budget[];
    constructor(
        public budgetsService: BudgetsService
    ) { }

    ngOnInit() {
        this.budgetsService.entities = budgets;
        this.budgetsService
            .getBudgets({snapshot: false})
            .subscribe(budgets => this.budgets = budgets);
    }

    removeBudget(budget) {
        const index = this.budgets.indexOf(budget);
        this.budgets.splice(index, 1);
    }

    addBudget() {
        this.budgets.push(this.budgetsService.createBudget());
    }
}