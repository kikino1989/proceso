import { Component, Input } from '@angular/core';
import Budget from 'src/app/models/Budget';
import IncomeSource from 'src/app/models/IncomeSource';
import Spence from 'src/app/models/Spence';
import { ValueAccessor } from '@ionic/angular/dist/directives/control-value-accessors/value-accessor';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'summary',
    templateUrl: 'summary.component.html',
    styleUrls: ['summary.component.scss']
})
export default class SummaryComponent {
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

    addToIncomeSource(incomeSource: IncomeSource) {
        this.alertController.create({
            header: "Add to income?",
            message: "this will affect your budget.",
            buttons: [
                {
                    text: 'Add',
                    handler: ({value}) => {
                        incomeSource.value += parseInt(value);
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
                        spence.value += parseInt(value);
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