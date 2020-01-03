import {Budget} from '../models/Budget';
import {Spence} from '../models/Spence';
import { Injectable } from '@angular/core';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import moment from 'moment';
import * as _ from 'lodash';
import {IncomeSource} from '../models/IncomeSource';
import { DBService } from '../libs/DBService';
import { DatabaseService } from './database.service';

const HOUR_PERIOD = 8 * 1000 * 60 * 60;

@Injectable({
    providedIn: 'root',
})
export class BudgetsService extends DBService {
    constructor(
        private bm: BackgroundMode,
        protected database: DatabaseService
    ) { super(database); }

    init() {
        this.model = new Budget();
    }
    
    getBudgets(where): Promise<Budget[]> {
        return this.model.all(where) as Promise<Budget[]>;
    }

    getBudget(id: number): Promise<Budget> {
        return this.model.one({id}) as Promise<Budget>;
    }

    createBudget() {
        const budget = new Budget({
            name: 'example budget',
            _limit: 3000, 
            incomeSource: [
                new IncomeSource({name: 'Job', value: 1800})
            ],
            spence: [
                new Spence({name: 'rent/mortgage', value: 1200}),
                new Spence({name: 'phone', value: 120}),
                new Spence({name: 'electricity', value: 180}),
                new Spence({name: 'gas', value: 120}),
                new Spence({name: 'water', value: 100}),
                new Spence({name: 'cable/internet', value: 80}),
                new Spence({name: 'garbage', value: 100}),
                new Spence({name: 'transportation', value: 120}),
                new Spence({name: 'food', value: 200}),
                new Spence({name: 'clothe', value: 40}),
                new Spence({name: 'entertainment', value: 100}),
                new Spence({name: 'debts', value: 1200}),
            ]
        });
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
        return this.database.dbReady.toPromise().then(async () => {
            const matches = await this.getBudgets({active: true});
            return matches.length ? matches[0] : null;
        });
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
        return this.database.dbReady.toPromise().then(async () => {
            if (!budget)
                return true;

            const budgets = await this.getBudgets({parentID: budget.id, snapshot: moment().subtract(1, 'day').format('MM-DD-YYYY')});
            return !!budgets.length;
        });
    }

    getSnapshots(budget: Budget): Promise<Budget[]> {
        return this.getBudgets({parentID: budget.id});
    }
}