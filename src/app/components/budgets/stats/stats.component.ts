import { Component, Input } from '@angular/core';
import {Budget} from '../../../models/Budget';
import {BudgetsService} from '../../../services/budgets.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { ModalController } from '@ionic/angular';
import {BudgetCardComponent} from '../budget-card/budget-card.component';

@Component({
    selector: 'stats',
    templateUrl: 'stats.component.html',
    styleUrls: ['stats.component.scss']
})
export class StatsComponent {
    @Input() budget: Budget;
    public snapshots: Budget[];
    private snapshotSubscriptions: Subscription;
    private orgSnapshots: Budget[];

    constructor(
        private budgetService: BudgetsService,
        private modalCtrl: ModalController
    ) { }

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
        this.snapshots = this.orgSnapshots.filter(({snapshot}) => {
            return !value || (snapshot && (snapshot as string).indexOf(value) > -1);
        });
    }

    openSnapshot(snapshot: Budget) {
        this.modalCtrl.create({
            component: BudgetCardComponent,
            componentProps: {
                budget: snapshot
            }
        }).then(modal => {
            modal.present();
        })
    }
}