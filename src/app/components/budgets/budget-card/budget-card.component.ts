import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Budget from 'src/app/models/Budget';
import BudgetsService from 'src/app/services/budgets.service';
import { ModalController } from '@ionic/angular';

export const enum MODES { SUMMARY = 'summary', EDIT = 'edit', STATS = 'stats', SAVE = 'save' }

@Component({
    selector: 'budget-card',
    templateUrl: './budget-card.component.html',
    styleUrls: ['./budget-card.component.scss'],
})
export default class BudgetCardComponent implements OnInit {
    public mode: MODES = MODES.SUMMARY;
    @Input() budget: Budget;
    @Input() removeBudget?: (budget: Budget) => void;
    @Output() budgetChange = new EventEmitter<Budget>();
    public saveEvent = new EventEmitter<boolean>();
    public saveBudget: (data) => void;

    constructor(
        private budgetService: BudgetsService,
        private modalCtrl: ModalController
    ) { }

    ngOnInit() {
        this.saveBudget = data => {
            this.budgetService.updateBudget(this.budget, data);
            this.mode = MODES.EDIT;
        };
    }

    ngOnDestroy() {
        delete this.saveBudget;
    }

    isSave() {
        return this.mode === MODES.SAVE;
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

    setStatsMode() {
        this.mode = MODES.STATS;
    }

    setEditSaveMode(budgetChanges = false) {
        if (budgetChanges) {
            this.mode = MODES.SAVE;
        } else {
            this.saveEvent.emit(this.isSave());
            this.mode = MODES.EDIT;
        }
    }

    setSummaryMode() {
        this.mode = MODES.SUMMARY;
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
