import { Component, Input } from '@angular/core';
import Budget from 'src/app/models/Budget';
@Component({
    selector: 'stats',
    templateUrl: 'stats.component.html',
    styleUrls: ['stats.component.scss']
})
export default class StatsComponent {
    @Input() budget: Budget;

    constructor() { }

    get spencesData() {
        if (this.budget.spences.length)
            return {
                label: 'Spences distribution',
                data: {
                    labels: this.budget.spences.map(spence => spence.name),
                    values: this.budget.spences.map(spence => spence.value)
                }
            };
        return false;
    }
}