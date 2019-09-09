import Budget from '../models/Budget';
import Spence from '../models/Spence';
import ImcomeSource from '../models/IncomeSource';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {budgets} from './testdata';

@Injectable({
    providedIn: 'root',
})
export default class BudgetsService {
    getBudgets(): Observable<Budget[]> {
        return of(budgets);
    }

    getBudget(id: number) {
    }

    createBudget() {

    }

    updateBudget(budget: Budget) {

    }

    deleteBudget(id: number) {

    }
}