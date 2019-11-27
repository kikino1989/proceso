import { Component, Input } from '@angular/core';
import {Budget} from '../../../models/Budget';
import {IncomeSource} from '../../../models/IncomeSource';
import {Spence} from '../../../models/Spence';
import { AlertController } from '@ionic/angular';
import * as _ from 'lodash';

@Component({
    selector: 'summary',
    templateUrl: 'summary.component.html',
    styleUrls: ['summary.component.scss']
})
export class SummaryComponent {
    @Input() budget: Budget;
    private orgIncomeSources: IncomeSource[];
    private orgSpences: Spence[];
    private incomeSources: IncomeSource[];
    private spences: Spence[];

    constructor(public alertController: AlertController) { }

    ngOnInit() {
        this.orgIncomeSources = this.budget.incomeSources;
        this.orgSpences = this.budget.spences;
        this.incomeSources = _.cloneDeep(this.orgIncomeSources);
        this.spences = _.cloneDeep(this.orgSpences);
    }

    ngOnDelete() {
        delete this.orgIncomeSources;
        delete this.orgSpences;
        delete this.incomeSources;
        delete this.spences;
    }

    filterIncomeSources(value: string) {
        this.incomeSources = this.orgIncomeSources.filter(incomeSource => {
            return !value || incomeSource.name.toLowerCase().indexOf(value) > -1;
        });
    }

    filterSpences(value: string) {
        this.spences = this.orgSpences.filter(spence => {
            return !value || spence.name.toLowerCase().indexOf(value) > -1;
        });
    }

    addToIncomeSource(incomeSource: IncomeSource) {
        this.alertController.create({
            header: "Add to income?",
            message: "this will affect your budget.",
            buttons: [
                {
                    text: 'Add',
                    handler: ({value}) => {
                        incomeSource.value += value ? parseInt(value) : 0;
                    }
                }, 
                {
                    text: 'Cancel',
                    role: 'cancel',
                }
            ],
            inputs: [
                {
                    name: "value",
                    type: "number",
                    placeholder: "$1000.00"
                }
            ]
        }).then(alert => {
            alert.present();
        });
    }

    addToSpence(spence: Spence) {
        this.alertController.create({
            header: "Add to spence?",
            message: "This will affect your budget.",
            buttons: [
                {
                    text: 'Add',
                    handler: ({value}) => {
                        spence.value += value ? parseInt(value) : 0;
                    }
                }, 
                {
                    text: 'Cancel',
                    role: 'cancel',
                }
            ],
            inputs: [
                {
                    name: "value",
                    type: "number",
                    placeholder: "$1000.00"
                }
            ]
        }).then(alert => {
            alert.present();
        });
    }
}