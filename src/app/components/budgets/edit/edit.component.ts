import { Component, Input, Output, EventEmitter } from '@angular/core';
import Budget, { DAYS } from 'src/app/models/Budget';
import IncomeSource from 'src/app/models/IncomeSource';
import Spence from 'src/app/models/Spence';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { AlertController, ModalController } from '@ionic/angular';
import { IncomeSourceComponent } from '../income-source/income-source.component';
import { SpenceComponent } from '../spence/spence.component';
import * as _ from 'lodash';

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
        this.budgetClone = _.cloneDeep(this.budget);
        this.orgIncomeSources = _.cloneDeep(this.budget.incomeSources);
        this.orgSpences = _.cloneDeep(this.budget.spences);
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
            component: IncomeSourceComponent
        }).then(modal => {
            modal.present();
            return modal.onWillDismiss().then(({data}) => {
                if (data) {
                    this.budgetClone.incomeSources.push(data);
                    this.orgIncomeSources = _.cloneDeep(this.budgetClone.incomeSources);
                    console.log('what is emitting::', this.budgetClone);
                    this.budgetChange.emit(this.budgetClone);
                }
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
            component: SpenceComponent
        }).then(modal => {
            modal.present();
            return modal.onWillDismiss().then(({data}) => {
                if (data) {
                    this.budgetClone.spences.push(data);
                    this.orgSpences = _.cloneDeep(this.budgetClone.spences);
                    this.budgetChange.emit(this.budgetClone);
                }
            });
        });
    }

    removeSpence(spence: Spence) {
        const index = this.budgetClone.spences.indexOf(spence);
        this.budgetClone.spences.splice(index, 1);
        this.budgetChange.emit(this.budgetClone);
    }

    editSpence(spence) {
        this.modalController.create({
            component: SpenceComponent,
            componentProps: {
                spence: spence
            }
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then((data) => {
                spence = data;
                this.budgetChange.emit(this.budgetClone)
            });
        });
    }

    editIncome(incomeSource) {
        this.modalController.create({
            component: IncomeSourceComponent,
            componentProps: {
                incomeSource: incomeSource
            }
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then((data) => {
                incomeSource = data;
                this.budgetChange.emit(this.budgetClone);
            })
        });
    }

    get budgetDays() {
        return Object.values(DAYS as object);
    }
}