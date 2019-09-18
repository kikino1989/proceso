import { Component, Input } from '@angular/core';
import Budget from 'src/app/models/Budget';
import IncomeSource from 'src/app/models/IncomeSource';
import Spence from 'src/app/models/Spence';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'edit',
    templateUrl: 'edit.component.html',
    styleUrls: ['edit.component.scss']
})
export default class EditComponent {
    @Input() budget: Budget;
    private orgIncomeSources: IncomeSource[];
    private orgSpences: Spence[];

    constructor(public alertController: AlertController) { }

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
        });
    }

    addIncomeSource() {
        this.budget.incomeSources.push(new IncomeSource(-1, 'my income source', 1000));
    }

    removeIncomeSource(incomeSource: IncomeSource) {
        const index = this.budget.incomeSources.indexOf(incomeSource);
        this.budget.incomeSources.splice(index, 1);
    }

    addSpence() {
        this.budget.spences.push(new Spence(-1, 'my spence', 200));
    }

    removeSpence(spence: Spence) {
        const index = this.budget.spences.indexOf(spence);
        this.budget.spences.splice(index, 1);
    }
}