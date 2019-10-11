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

const HOUR_PERIOD = 1000 * 60 * 60;

@Injectable({
    providedIn: 'root',
})
export default class BudgetsService extends BaseService<Budget> {

    constructor(private bm: BackgroundMode) { super(); this.entities = budgets; }

    getBudgets(condition: Condition | Condition[]): Observable<Budget[]> {
        return this.all(condition);
    }

    getBudget(id: number): Observable<Budget> {
        return this.one(id);
    }

    createBudget(budget: Budget) {
        this.insert(budget);
    }

    updateBudget(budget: Budget, data: any) {
        this.update({...budget, ...data});
    }

    deleteBudget(budget: Budget) {
        this.delete(budget.id);
    }

    async watchBudget(today = moment().format('Do')) {
        if (window.cordova && !this.bm.isEnabled()) {
            this.bm.enable();
        }
        const activeBudget = await this.getActiveBudget();
        setTimeout(async () => {
            const hasSnapshot = await this.snapshotForThisMonth(activeBudget);
            if (activeBudget.startDate.indexOf(today) && !hasSnapshot) {
                this.takeSnapshot();
            } 
            this.watchBudget(today);
        }, 1000) //HOUR_PERIOD);
    }

    async getActiveBudget(): Promise<Budget> {
        const matches = await this.getBudgets({active: true}).toPromise();
        return matches.length ? matches[0] : null;
    }

    async takeSnapshot() {
        const activeBudget = await this.getActiveBudget();
        const snapshot = _.cloneDeep(activeBudget);
        snapshot.snapshot = moment().subtract(1, 'day').format('MM-DD-YYYY');
        snapshot.parentID = activeBudget.id;
        snapshot.id++;
        this.createBudget(snapshot);
        this.resetBudget(activeBudget);
    }

    resetBudget(budget: Budget) {
        budget.reset();
        this.update(budget);
    }

    async snapshotForThisMonth(budget: Budget): Promise<boolean> {
        const budgets = await this.getBudgets({parentID: budget.id, snapshot: moment().format('MM-DD-YYYY')}).toPromise();
        return !!budgets.length;
    }

    getSnapshots(budget: Budget): Observable<Budget[]> {
        return this.getBudgets({parentID: budget.id});
    }
}