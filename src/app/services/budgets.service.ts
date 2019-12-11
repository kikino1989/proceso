import {Budget} from '../models/Budget';
import {Spence} from '../models/Spence';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import moment from 'moment';
import * as _ from 'lodash';
import {IncomeSource} from '../models/IncomeSource';

const HOUR_PERIOD = 8 * 1000 * 60 * 60;

@Injectable({
    providedIn: 'root',
})
export class BudgetsService {
    private model = new Budget();
    constructor(private bm: BackgroundMode) { }

    getBudgets(where): Promise<Budget[]> {
        return this.model.all(where) as Promise<Budget[]>;
    }

    getBudget(id: number): Promise<Budget> {
        return this.model.one({id}) as Promise<Budget>;
    }

    createBudget() {
        const budget = new Budget('example budget', 3000, [
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
        ]);
        budget.insert();
        return budget;
    }

    async watchBudget(today = moment().format('Do')) {
        if (window.cordova && !this.bm.isEnabled()) {
            this.bm.enable();
        }
        const activeBudget = await this.getActiveBudget();
        setTimeout(async () => {
            const hasSnapshot = await this.snapshotForThisMonth(activeBudget);
            if (activeBudget && activeBudget.startDate.indexOf(today) && !hasSnapshot) {
                this.takeSnapshot();
            } 
            this.watchBudget(today);
        }, HOUR_PERIOD);
    }

    async getActiveBudget(): Promise<Budget> {
        const matches = await this.getBudgets({active: true});
        return matches.length ? matches[0] : null;
    }

    async takeSnapshot() {
        const activeBudget = await this.getActiveBudget();
        if (activeBudget) {
            const snapshot = _.cloneDeep(activeBudget);
            snapshot.snapshot = moment().subtract(1, 'day').format('MM-DD-YYYY');
            snapshot.parentID = activeBudget.id;
            snapshot.id++;
            snapshot.insert();
            this.resetBudget(activeBudget);
        }
    }

    resetBudget(budget: Budget) {
        budget.reset();
        budget.update();
    }

    async snapshotForThisMonth(budget: Budget): Promise<boolean> {
        if (!budget)
            return true;

        const budgets = await this.getBudgets({parentID: budget.id, snapshot: moment().subtract(1, 'day').format('MM-DD-YYYY')});
        return !!budgets.length;
    }

    getSnapshots(budget: Budget): Promise<Budget[]> {
        return this.getBudgets({parentID: budget.id});
    }
}