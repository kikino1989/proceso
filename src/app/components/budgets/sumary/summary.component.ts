import { Component, Input } from '@angular/core';
import Budget from 'src/app/models/Budget';
import IncomeSource from 'src/app/models/IncomeSource';
import Spence from 'src/app/models/Spence';

@Component({
    selector: 'summary',
    templateUrl: 'summary.component.html',
    styleUrls: ['summary.component.scss']
})
export default class SummaryComponent {
    @Input() budget: Budget;
    private orgIncomeSources: IncomeSource[];
    private orgSpences: Spence[];
    constructor() { }

    ngOnInit() {
        this.orgIncomeSources = this.budget.incomeSources;
        this.orgSpences = this.budget.spences;
    }

    filterIncomeSources(value: string) {
        this.budget.incomeSources = this.orgIncomeSources.filter(incomeSource => {
            return !value || incomeSource.name.indexOf(value) > -1;
        });
    }

    filterSpences(value: string) {
        this.budget.spences = this.orgSpences.filter(spence => {
            return !value || spence.name.indexOf(value) > -1;
        })
    }


}