import { Component } from '@angular/core';
import BudgetsService from '../../services/budgets.service';
import Budget from '../../models/Budget';

@Component({
    selector: 'budgets',
    templateUrl: 'budgets.component.html',
    styleUrls: ['budgets.component.scss']
})
export default class BudgetsComponent {
    public budgets: Budget[];
    constructor(
        public budgetsSerivce: BudgetsService
    ) { }

    ngOnInit() {
        this.budgetsSerivce
            .getBudgets()
            .subscribe(budgets => this.budgets = budgets);
    }

    removeBudget(budget) {
        this.budgetsSerivce.deleteBudget(budget);
    }
}