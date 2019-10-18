import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Budget} from '../../../models/Budget';
import {DAYS} from '../../../models/DAYS'
import {IncomeSource} from '../../../models/IncomeSource';
import {Spence} from '../../../models/Spence';
import { ModalController } from '@ionic/angular';
import { IncomeSourceComponent } from '../income-source/income-source.component';
import { SpenceComponent } from '../spence/spence.component';
import * as _ from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'edit',
    templateUrl: 'edit.component.html',
    styleUrls: ['edit.component.scss']
})
export class EditComponent {
    @Input() budget: Budget;
    @Input() saveEvent: EventEmitter<boolean>;
    @Input() saveBudget: (data) => void;
    @Output() budgetChanged = new EventEmitter<boolean>();
    public budgetForm: FormGroup;
    public incomeSources: IncomeSource[];
    public spences: Spence[];
    private orgIncomeSources: IncomeSource[];
    private orgSpences: Spence[];
    private saveSubscription: Subscription;
    private budgetSubscription: Subscription;

    constructor(
        private fb: FormBuilder,
        private modalController: ModalController
    ) { }

    ngOnInit() {
        this.budgetForm = this.fb.group({
            name: [this.budget.name, Validators.required],
            limit: [this.budget.limit, Validators.required],
            startDate: [this.budget.startDate, Validators.required]
        });;
        this.budgetSubscription = this.budgetForm.valueChanges.subscribe(() => {
                this.budgetChanged.emit(this.budgetForm.valid);
        });
        this.incomeSources = _.cloneDeep(this.budget.incomeSources);
        this.spences = _.cloneDeep(this.budget.spences);
        this.orgIncomeSources = _.cloneDeep(this.budget.incomeSources);
        this.orgSpences = _.cloneDeep(this.budget.spences);

        this.saveSubscription = this.saveEvent.subscribe((saved) => {
            if (saved) {
                this.saveBudget({...this.budgetForm.value, ...{
                    incomeSources: this.incomeSources,
                    spences: this.spences}
                });
            }
        });
    }

    ngOnDestroy() {
        delete this.incomeSources;
        delete this.spences;
        delete this.orgIncomeSources;
        delete this.orgSpences;
        delete this.budgetChanged;
        delete this.budgetForm;
        this.saveSubscription.unsubscribe();
        this.budgetSubscription.unsubscribe();
    }

    filterIncomeSources(value: string) {
        this.incomeSources = this.orgIncomeSources.filter(incomeSource => {
            return !value || incomeSource.name.indexOf(value) > -1;
        });
    }

    filterSpences(value: string) {
        this.spences = this.orgSpences.filter(spence => {
            return !value || spence.name.indexOf(value) > -1;
        });
    }

    addIncomeSource() {
        this.modalController.create({
            component: IncomeSourceComponent
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then(({data}) => {
                if (data) {
                    this.incomeSources.push(data);
                    this.orgIncomeSources = _.cloneDeep(this.incomeSources);
                    this.budgetChanged.emit(this.budgetForm.valid);
                }
            });
        });
    }

    removeIncomeSource(incomeSource: IncomeSource) {
        const index = this.incomeSources.indexOf(incomeSource);
        this.incomeSources.splice(index, 1);
        this.budgetChanged.emit(this.budgetForm.valid);
    }

    addSpence() {
        this.modalController.create({
            component: SpenceComponent
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then(({data}) => {
                if (data) {
                    this.spences.push(data);
                    this.orgSpences = _.cloneDeep(this.spences);
                    this.budgetChanged.emit(this.budgetForm.valid);
                }
            });
        });
    }

    removeSpence(spence: Spence) {
        const index = this.spences.indexOf(spence);
        this.spences.splice(index, 1);
        this.budgetChanged.emit(this.budgetForm.valid);
    }

    editSpence(spence) {
        this.modalController.create({
            component: SpenceComponent,
            componentProps: {
                spence: spence
            }
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then(({data}) => {
                if (data) {
                    spence = data;
                    this.budgetChanged.emit(this.budgetForm.valid);
                }
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
            modal.onWillDismiss().then(({data}) => {
                if (data) {
                    incomeSource = data;
                    this.budgetChanged.emit(this.budgetForm.valid);
                }
            })
        });
    }

    get budgetDays() {
        return Object.values(DAYS as object);
    }
}