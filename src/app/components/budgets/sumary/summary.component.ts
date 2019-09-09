import { Component, Input, Output, EventEmitter } from '@angular/core';
import Budget from 'src/app/models/Budget';
import { MODES } from '../budgets.component';

@Component({
    selector: 'summary',
    templateUrl: 'summary.component.html',
    styleUrls: ['summary.component.scss']
})
export default class SummaryComponent {
    @Input() budget: Budget;
    @Input() mode: MODES;
    @Output() modeChange = new EventEmitter<MODES>();

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
        this.modeChange.emit(MODES.STATS);
    }

    setEditMode() {
        this.modeChange.emit(MODES.EDIT);
    }

    setSummaryMode() {
        this.modeChange.emit(MODES.SUMMARY);
    }
}