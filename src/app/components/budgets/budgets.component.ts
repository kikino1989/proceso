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

    async updateBudgets(budget) {
        for (let i = 0; i < this.budgets.length; i++) {
            this.budgets[i].active = false;
            await this.budgets[i].update();
        }
        budget.active = true;
        budget.update();
    }
}