import { Component } from '@angular/core';
import BudgetsService from '../../services/budgets.service';
import Budget from '../../models/Budget';
import SummaryComponent from './sumary/summary.component';

export const enum MODES { SUMMARY = 'summary', EDIT = 'edit', STATS = 'stats' }

@Component({
    selector: 'budgets',
    templateUrl: 'budgets.component.html',
    styleUrls: ['budgets.component.scss']
})
export default class BudgetsComponent {
    public budgets: Budget[];
    public mode = MODES.SUMMARY;
    constructor(
        public budgetsSerivce: BudgetsService
    ) { }

    ngOnInit() {
        this.budgetsSerivce
            .getBudgets()
            .subscribe(budgets => this.budgets = budgets);
    }

    deselectBudgets(budget: Budget) {
        this.budgets.forEach(_budget => {
            if (budget.id != _budget.id) {
                _budget.active = false;
            }
        });
    }

    isStats(): boolean {
        return this.mode === MODES.STATS;
    }

    isEdit(): boolean {
        return this.mode === MODES.EDIT;
    }

    isSummary(): boolean {
        return this.mode === MODES.SUMMARY;
    }
}