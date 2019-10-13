import Budget from '../models/Budget';
import Spence from '../models/Spence';
import ImcomeSource from '../models/IncomeSource';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {budgets} from './testdata';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import moment from 'moment';
import * as _ from 'lodash';
import BaseService, { Condition} from '../libs/base.service';
import IncomeSource from '../models/IncomeSource';

const HOUR_PERIOD = 1000; // 8 * 1000 * 60 * 60;

@Injectable({
    providedIn: 'root',
})
export default class BudgetsService extends BaseService<Budget> {

    constructor(private bm: BackgroundMode) { super(); }

    getBudgets(condition: Condition | Condition[]): Observable<Budget[]> {
        return this.all(condition);
    }

    getBudget(id: number): Observable<Budget> {
        return this.one(id);
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
        this.insert(budget);
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
        const matches = await this.getBudgets({active: true}).toPromise();
        return matches.length ? matches[0] : null;
    }

    async takeSnapshot() {
        const activeBudget = await this.getActiveBudget();
        if (activeBudget) {
            const snapshot = _.cloneDeep(activeBudget);
            snapshot.snapshot = moment().subtract(1, 'day').format('MM-DD-YYYY');
            snapshot.parentID = activeBudget.id;
            snapshot.id++;
            this.insert(snapshot);
            this.resetBudget(activeBudget);
        }
    }

    resetBudget(budget: Budget) {
        budget.reset();
        this.update(budget);
    }

    async snapshotForThisMonth(budget: Budget): Promise<boolean> {
        if (!budget)
            return true;

        const budgets = await this.getBudgets({parentID: budget.id, snapshot: moment().subtract(1, 'day').format('MM-DD-YYYY')}).toPromise();
        return !!budgets.length;
    }

    getSnapshots(budget: Budget): Observable<Budget[]> {
        return this.getBudgets({parentID: budget.id});
    }
}