import { Component, Input } from '@angular/core';
import Budget from 'src/app/models/Budget';
import IncomeSource from 'src/app/models/IncomeSource';
import Spence from 'src/app/models/Spence';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { AlertController, ModalController } from '@ionic/angular';
import { IncomeSourceComponent } from '../income-source/income-source.component';
import { SpenceComponent } from '../spence/spence.component';

@Component({
    selector: 'edit',
    templateUrl: 'edit.component.html',
    styleUrls: ['edit.component.scss']
})
export default class EditComponent {
    @Input() budget: Budget;
    public budgetClone: Budget;
    private orgIncomeSources: IncomeSource[];
    private orgSpences: Spence[];

    constructor(
        public alertController: AlertController,
        public modalController: ModalController
    ) { }

    ngOnInit() {
        this.budgetClone = {...this.budget};
        this.orgIncomeSources = this.budget.incomeSources.slice();
        this.orgSpences = this.budget.spences.slice();
    }

    ngOnDestroy() {
        delete this.orgIncomeSources;
        delete this.orgSpences;
    }

    filterIncomeSources(value: string) {
        this.budgetClone.incomeSources = this.orgIncomeSources.filter(incomeSource => {
            return !value || incomeSource.name.indexOf(value) > -1;
        });
    }

    filterSpences(value: string) {
        this.budgetClone.spences = this.orgSpences.filter(spence => {
            return !value || spence.name.indexOf(value) > -1;
        });
    }

    addIncomeSource() {
        this.modalController.create({
            component: IncomeSourceComponent,
            componentProps: {
                budget: this.budgetClone
            }
        }).then(modal => {
            modal.present();
        });
    }

    removeIncomeSource(incomeSource: IncomeSource) {
        const index = this.budget.incomeSources.indexOf(incomeSource);
        this.budget.incomeSources.splice(index, 1);
    }

    addSpence() {
        this.modalController.create({
            component: SpenceComponent,
            componentProps: {
                budget: this.budgetClone
            }
        }).then(modal => {
            modal.present();
        });
    }

    removeSpence(spence: Spence) {
        const index = this.budget.spences.indexOf(spence);
        this.budget.spences.splice(index, 1);
    }

    save() {
        this.budget = { ...this.budget, ...this.budgetClone};
    }
}