import { Component, OnInit, Input } from '@angular/core';
import {Budget} from '../../../models/Budget';

@Component({
    selector: 'projections',
    templateUrl: './projections.component.html',
    styleUrls: ['./projections.component.scss'],
})
export class ProjectionsComponent implements OnInit {
    @Input() budget: Budget;
    constructor() { }

    ngOnInit() { }

    get projectionsData() {
        if (this.budget.profit) {
            const labels = [];
            const funds = [];

            for (let i = 1; i <= 12; i++) {
                labels.push(`month ${i}`);
                funds.push(i * this.budget.profit);
                if (i === Math.floor(this.budget.energencyFundTime)) {
                    labels.push('Emergency Fund')
                    funds.push(1000);
                }
                if (i === Math.floor(this.budget.fullyFundedEmergencyFundTime)) {
                    labels.push('Fully Funded Emergency Fund')
                    funds.push(this.budget.fullyFundedEmergencyFund);
                }
            }
            return {
                label: 'Emergency Fund',
                data: {
                    labels: labels,
                    values: funds
                }
            };
        }
        return false;
    }
}
