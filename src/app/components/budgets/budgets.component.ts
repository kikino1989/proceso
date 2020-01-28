import { Component } from '@angular/core';
import {BudgetsService} from '../../services/budgets.service';
import {Budget} from '../../models/Budget';

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

    ionViewWillEnter() {
        this.budgetsService.waitForDatabase(() => {
            this.budgetsService
                .getBudgets({snapshot: null})
                .then(budgets => this.budgets = budgets);
        });
    }

    removeBudget(budget) {
        const index = this.budgets.indexOf(budget);
        this.budgets.splice(index, 1);
        budget.delete();
    }

    addBudget() {
        this.budgetsService.waitForDatabase(async () => {
            const budget = await this.budgetsService.createBudget();
            this.budgets.push(budget);
            budget.insert();
        });
    }

    updateBudgets(event, budget?) {
        budget.active = event.detail.checked;
        this.budgets.forEach(budget => budget.update());
    }
}