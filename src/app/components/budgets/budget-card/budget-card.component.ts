import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Budget from 'src/app/models/Budget';

export const enum MODES { SUMMARY = 'summary', EDIT = 'edit', STATS = 'stats' }

@Component({
    selector: 'budget-card',
    templateUrl: './budget-card.component.html',
    styleUrls: ['./budget-card.component.scss'],
})
export default class BudgetCardComponent implements OnInit {
    public mode: MODES = MODES.SUMMARY;
    @Input() budget: Budget;
    @Input() removeBudget: (budget: Budget) => {};
    @Output() budgetChange = new EventEmitter<Budget>();
    private budgetChanges: Budget;

    constructor() { }

    ngOnInit() { }

    isStats(): boolean {
        return this.mode === MODES.STATS;
    }

    isEdit(): boolean {
        return this.mode === MODES.EDIT;
    }

    isSummary(): boolean {
        return this.mode === MODES.SUMMARY;
    }

    setStatsMode() {
        this.mode = MODES.STATS;
    }

    setEditMode() {
        if (!this.saveBudget(this.isEdit())) {
            this.mode = MODES.EDIT;
        }
    }

    setSummaryMode() {
        this.mode = MODES.SUMMARY;
    }

    presaveBudget(budget) {
        this.budgetChanges = budget;
    }
    
    saveBudget(save) {
        console.log('save', save, 'budget changes', this.budgetChanges)
        if (this.budgetChanges && save) {
            this.budget = this.budgetChanges;
            this.budgetChange.emit(this.budget);
            this.mode = MODES.SUMMARY;
            return true;
        }
        return false;
    }
}
