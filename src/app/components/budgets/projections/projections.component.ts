import { Component, OnInit, Input } from '@angular/core';
import {Budget} from '../../../models/Budget';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'projections',
    templateUrl: './projections.component.html',
    styleUrls: ['./projections.component.scss'],
})
export class ProjectionsComponent implements OnInit {
    @Input() budget: Budget;
    constructor(
        private translate: TranslateService
    ) { }

    ngOnInit() { }

    get projectionsData() {
        if (this.budget.profit) {
            const labels = [];
            const funds = [];

            for (let i = 1; i <= 12; i++) {
                labels.push(`month ${i}`);
                funds.push(i * this.budget.profit);
                if (i === Math.floor(this.budget.energencyFundTime)) {
                    labels.push(this.translate.get('emergencyFund'))
                    funds.push(1000);
                }
                if (i === Math.floor(this.budget.fullyFundedEmergencyFundTime)) {
                    labels.push('Fully Funded Emergency Fund')
                    funds.push(this.budget.fullyFundedEmergencyFund);
                }
            }
            return {
                label: this.translate.get('emergencyFund'),
                data: {
                    labels: labels,
                    values: funds
                }
            };
        }
        return false;
    }
}
