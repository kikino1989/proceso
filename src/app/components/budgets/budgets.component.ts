import { Component } from '@angular/core';
import BudgetsService from '../../services/budgets.service';
import Budget from '../../models/Budget';
import IncomeSource from 'src/app/models/IncomeSource';
import Spence from 'src/app/models/Spence';

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

    addBudget() {
        this.budgets.push(new Budget('example budget', 3000, [
            new IncomeSource('Job', 1800)
        ], [
            new Spence('rent/mortgage', 1200),
            new Spence('phone', 120),
            new Spence('electricity', 180),
            new Spence('gas', 120),
            new Spence('water', 100),
            new Spence('cable/internet', 80),
            new Spence('garbage', 100),
            new Spence('transportation', 120),
            new Spence('food', 200),
            new Spence('clothe', 40),
            new Spence('entertainment', 100),
            new Spence('debts', 1200),
        ]));
    }
}