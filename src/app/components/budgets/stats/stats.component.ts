import { Component, Input } from '@angular/core';
import Budget from 'src/app/models/Budget';
import BudgetsService from 'src/app/services/budgets.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
    selector: 'stats',
    templateUrl: 'stats.component.html',
    styleUrls: ['stats.component.scss']
})
export default class StatsComponent {
    @Input() budget: Budget;
    public snapshots: Budget[];
    private snapshotSubscriptions: Subscription;
    private orgSnapshots: Budget[];

    constructor(private budgetService: BudgetsService) { }

    ngOnInit() {
        this.snapshotSubscriptions =
            this.budgetService
                .getSnapshots(this.budget)
                .subscribe(snapshots => {
                    this.snapshots = snapshots;
                    this.orgSnapshots = _.cloneDeep(this.snapshots);
                });
    }

    ngOnDestroy() {
        delete this.snapshots;
        this.snapshotSubscriptions.unsubscribe();
    }

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

    filterSnapshots(value: string) {
        this.snapshots = this.orgSnapshots.filter(snapshot => {
            return !value || snapshot.name.indexOf(value) > -1;
        });
    }
}