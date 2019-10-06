import Budget from '../models/Budget';
import Spence from '../models/Spence';
import ImcomeSource from '../models/IncomeSource';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {budgets} from './testdata';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import moment from 'moment';
import * as _ from 'lodash';

const HOUR_PERIOD = 1000 * 60 * 60;

@Injectable({
    providedIn: 'root',
})
export default class BudgetsService {

    constructor(private bm: BackgroundMode) { }

    getBudgets(condition: any = false): Observable<Budget[]> {
        if (window.cordova) {
            // do sqlite
        } else {
            if (condition) {
                return of(budgets.filter(budget => {
                    const matches = [];
                    for (const key in condition) {
                        if (budget.hasOwnProperty(key)) {
                            matches.push(budget[key] === condition[key] ? 1 : 0);
                        }
                    }
                    return matches.reduce((match, cur) => match + cur) === matches.length;
                }));
            }
            return of(budgets);
        }
    }

    getBudget(id: number): Observable<Budget> {
        if (window.cordova) {
            // do sqlite
        } else {
            return of(budgets.filter(budget => budget.id == id)[0]);
        }
    }

    createBudget(budget: Budget) {
        if (window.cordova) {
            // save to the database
        } else {
            budgets.push(budget);
        }
    }

    updateBudget(budget: Budget, data: any) {
        for (const prop in data) {
            if (budget.hasOwnProperty(prop)) {
                budget[prop] = data[prop];
            }
        }
        if (window.cordova) {
            // save to the database
        }
    }

    deleteBudget(budget: Budget) {
        const index = budgets.indexOf(budget);
        budgets.splice(index, 1);
    }

    async watchBudget(today = moment().format('Do')) {
        if (window.cordova && !this.bm.isEnabled()) {
            this.bm.enable();
        }
        const activeBudget = await this.getActiveBudget();
        const hasSnapshot = await this.snapshotForThisMonth();
        setTimeout(() => {
            if (activeBudget.startDate.indexOf(today) && !hasSnapshot) {
                this.takeSnapshot();
            } 
            this.watchBudget(today);
        }, 1000);
    }

    async getActiveBudget(): Promise<Budget> {
        const matches = await this.getBudgets({active: true}).toPromise();
        return matches.length ? matches[0] : null;
    }

    async takeSnapshot() {
        const activeBudget = await this.getActiveBudget();
        const snapshot = _.cloneDeep(activeBudget);
        snapshot.snapshot = moment().format('MM-DD-YYYY');
        snapshot.parentID = activeBudget.id;
        snapshot.id++;
        this.createBudget(snapshot);
    }

    async snapshotForThisMonth(): Promise<boolean> {
        const budgets = await this.getBudgets({snapshot: moment().format('MM-DD-YYYY')}).toPromise();
        return !!budgets.length;
    }

    getSnapshots(budget: Budget): Observable<Budget[]> {
        return this.getBudgets({id: budget.id});
    }
}