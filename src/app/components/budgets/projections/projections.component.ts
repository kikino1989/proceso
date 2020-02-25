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
    projectionsData: any = {};
    constructor(
        private translate: TranslateService
    ) { }

    ngOnInit() {
        this.setProjectionsData();
    }

    async setProjectionsData() {
        if (this.budget.profit) {
            const labels = [];
            const funds = [];

            for (let i = 1; i <= 12; i++) {
                labels.push(`month ${i}`);
                funds.push(i * this.budget.profit);
                if (i === Math.floor(this.budget.energencyFundTime)) {
                    const label = await this.translate.get('emergencyFund').toPromise();
                    labels.push(label);
                    funds.push(1000);
                }
                if (i === Math.floor(this.budget.fullyFundedEmergencyFundTime)) {
                    const label = this.translate.get('Fully Funded Emergency Fund').toPromise();
                    labels.push(label);
                    funds.push(this.budget.fullyFundedEmergencyFund);
                }
            }

            const label = await this.translate.get('emergencyFund').toPromise();
            this.projectionsData = {
                label: label,
                data: {
                    labels: labels,
                    values: funds
                }
            };
        }
    }
}
