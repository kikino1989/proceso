import { Component, OnInit } from '@angular/core';
import { ProspectingSteps } from '../../models/ProspectingSteps';
import { Subscription } from 'rxjs';
import { ProspectService } from '../../services/prospect.service';
import { AlertController, ModalController } from '@ionic/angular';
import * as _ from 'lodash';
import { StepComponent } from './step/step.component';

@Component({
    selector: 'steps',
    templateUrl: './steps.component.html',
    styleUrls: ['./steps.component.scss'],
})
export class StepsComponent implements OnInit {

    
    orgProspectingSteps: ProspectingSteps[];
    prospectingSteps: ProspectingSteps[];
    stepsSubscription: Subscription;
    constructor(
        private prospectService: ProspectService,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController
    ) { }

    ngOnInit() {
        this.stepsSubscription = this.prospectService.getProspectingSteps().subscribe(steps => {
            this.prospectingSteps = steps;
            this.orgProspectingSteps = _.cloneDeep(steps);
        });
    }

    ngOnDelete() {
        this.stepsSubscription.unsubscribe();
        delete this.orgProspectingSteps;
        delete this.prospectingSteps;
    }

    addProspectingStep() {
        this.modalCtrl.create({
            component: StepComponent
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then(({data: prospectingStep}) => {
                if (prospectingStep) {
                    this.orgProspectingSteps.push(prospectingStep);
                    this.prospectingSteps.push(prospectingStep);
                }
            });
        });
    }

    editProspect(prospectingStep: ProspectingSteps) {
        this.modalCtrl.create({
            component: StepComponent,
            componentProps: {
                prospectingStep
            }
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then(({data}) => {
                for (let prop in data) {
                    if (prospectingStep.hasOwnProperty(prop))
                        prospectingStep[prop] = data[prop];
                }
            });
        });
    }

    deleteProspect(prospectingStep: ProspectingSteps) {
        const index = this.prospectingSteps.findIndex(_prospectingStep => {
            return prospectingStep.id === _prospectingStep.id;
        });
        this.prospectingSteps.splice(index, 1);
        this.orgProspectingSteps.splice(index, 1);
    }

    filterProspectingSteps(value) {
        this.prospectingSteps = this.orgProspectingSteps.filter(prospect => {
            return !value || prospect.name.indexOf(value) > -1;
        });
    }

    viewStep(prospectingStep: ProspectingSteps) {
        this.alertCtrl.create({
            header: `(${prospectingStep.name})`,
            subHeader: `Tools Needed: ${prospectingStep.tools || 'N/A'}`,
            message: 
                `<b>Description:</b> ${prospectingStep.description || 'N/A'} <br /><br />
                <b>Starting Point:</b> ${prospectingStep.pointA || 'N/A'} <br /><br />
                <b>Goal:</b> ${prospectingStep.pointB || 'N/A'}`,
            buttons: [{text: "OK", role: "ok"}]
        }).then(alert => {
            alert.present();
        });
    }

}
