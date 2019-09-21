import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    @Output() budgetChange = new EventEmitter<Budget>();
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
        delete this.budgetClone;
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
            return modal.onWillDismiss().then(({data}) => {
                this.budgetClone = data;
                this.orgIncomeSources = this.budgetClone.incomeSources.slice();
                this.budgetChange.emit(this.budgetClone);
            });
        });
    }

    removeIncomeSource(incomeSource: IncomeSource) {
        const index = this.budgetClone.incomeSources.indexOf(incomeSource);
        this.budgetClone.incomeSources.splice(index, 1);
        this.budgetChange.emit(this.budgetClone);
    }

    addSpence() {
        this.modalController.create({
            component: SpenceComponent,
            componentProps: {
                budget: this.budgetClone
            }
        }).then(modal => {
            modal.present();
            return modal.onWillDismiss().then(({data}) => {
                this.budgetClone = data;
                this.orgSpences = this.budgetClone.spences.slice();
                this.budgetChange.emit(this.budgetClone);
            });
        });
    }

    removeSpence(spence: Spence) {
        const index = this.budgetClone.spences.indexOf(spence);
        this.budgetClone.spences.splice(index, 1);
        this.budgetChange.emit(this.budgetClone);
    }
}