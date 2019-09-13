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
    @Output() budgetsChange = new EventEmitter<Budget>();

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
        this.mode = MODES.EDIT;
    }

    setSummaryMode() {
        this.mode = MODES.SUMMARY;
    }

}
