import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/Prospect';
import { ProspectService } from 'src/app/services/prospect.service';
import { Subscription } from 'rxjs';
import { ProspectingSteps } from 'src/app/models/ProspectingSteps';
import * as _ from 'lodash';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-prospects',
    templateUrl: './prospects.component.html',
    styleUrls: ['./prospects.component.scss'],
})
export class ProspectsComponent implements OnInit {

    prospects: Prospect[];
    orgProspects: Prospect[];
    prospectingSteps: ProspectingSteps[];
    prospectSubscription: Subscription;
    stepsSubscription: Subscription;
    constructor(
        private prospectService: ProspectService,
        private alertCtrl: AlertController
    ) { }

    ngOnInit() {
        this.prospectSubscription = this.prospectService.getProspects().subscribe(prospects => {
            this.prospects = prospects;
            this.orgProspects = _.cloneDeep(this.prospects);
        });
        this.stepsSubscription = this.prospectService.getProspectingSteps().subscribe(steps => this.prospectingSteps = steps);
    }

    ngOnDelete() {
        this.prospectSubscription.unsubscribe();
        this.stepsSubscription.unsubscribe();
        delete this.prospects;
        delete this.orgProspects;
        delete this.prospectingSteps;
    }

    addProspect() {
        
    }

    deleteProspect(prospect: Prospect) {
        const index = this.prospects.findIndex(_prospect => {
            return prospect.id === _prospect.id;
        });
        this.prospects.splice(index, 1);
        this.orgProspects.splice(index, 1);
        this.prospectService.delete(prospect.id);
    }

    editProspect(prospect: Prospect) {

    }

    filterProspects(value) {
        this.prospects = this.orgProspects.filter(prospect => {
            return !value || prospect.name.indexOf(value) > -1;
        });
    }

    changeStep(prospect: Prospect) {
        const inputs = [];
        this.prospectingSteps.forEach(step => {
            inputs.push({
                name: step.name,
                type: "radio",
                label: step.name,
                value: step.position,
                checked: step.position == prospect.step
            });
        });
        this.alertCtrl.create({
            header: "Choose step",
            inputs: inputs,
            buttons: [
                {text: "Cancel", role: "cancel"},
                {text: "OK", handler: step => {
                    prospect.step = step;
                }}
            ]
        }).then(alert => {
            alert.present();
        });
    }

}
