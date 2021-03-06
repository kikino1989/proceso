import { Component, OnInit } from '@angular/core';
import { ProspectingSteps } from '../../models/ProspectingSteps';
import { ProspectService } from '../../services/prospect.service';
import { AlertController, ModalController } from '@ionic/angular';
import * as _ from 'lodash';
import { StepComponent } from './step/step.component';

@Component({
    selector: 'steps',
    templateUrl: './steps.component.html',
    styleUrls: ['./steps.component.scss'],
})
export class StepsComponent {

    
    orgProspectingSteps: ProspectingSteps[];
    prospectingSteps: ProspectingSteps[];
    constructor(
        private prospectService: ProspectService,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController
    ) { }

    ionViewWillEnter() {
        this.prospectService.waitForDatabase(() => {
            this.prospectService.getProspectingSteps().then(steps => {
                this.prospectingSteps = steps;
                this.orgProspectingSteps = _.cloneDeep(steps);
            });
        });
    }

    ngOnDestroy() {
        delete this.orgProspectingSteps;
        delete this.prospectingSteps;
    }

    addProspectingStep() {
        this.modalCtrl.create({
            component: StepComponent,
            componentProps: {
                lastPosition: this.prospectingSteps.length
            }
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then(({data: prospectingStep}) => {
                if (prospectingStep) {
                    this.orgProspectingSteps.push(prospectingStep);
                    this.prospectingSteps.push(prospectingStep);
                }
                prospectingStep.insert();
            });
        });
    }

    editProspectingStep(prospectingStep: ProspectingSteps) {
        this.modalCtrl.create({
            component: StepComponent,
            componentProps: {
                orgProspectingStep: prospectingStep
            }
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then(({data}) => {
                for (let prop in data) {
                    if (prospectingStep.hasOwnProperty(prop))
                        prospectingStep[prop] = data[prop];
                }
                prospectingStep.update();
            });
        });
    }

    deleteProspectingStep(prospectingStep: ProspectingSteps) {
        const index = this.prospectingSteps.findIndex(_prospectingStep => {
            return prospectingStep.id === _prospectingStep.id;
        });
        this.prospectingSteps.splice(index, 1);
        this.orgProspectingSteps.splice(index, 1);
        prospectingStep.delete();
    }

    filterProspectingSteps(value) {
        this.prospectingSteps = this.orgProspectingSteps.filter(step => {
            return !value || step.name.toLowerCase().indexOf(value) > -1;
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

    move(step, index, dir) {
        const temp = this.prospectingSteps[index  + dir];
        this.prospectingSteps.splice(index + dir, 1, step);
        this.prospectingSteps.splice(index, 1, temp);
        step.position = step.position + dir;
        this.orgProspectingSteps = _.cloneDeep(this.prospectingSteps);
        this.updateSteps();
    }

    updateSteps() {
        this.prospectingSteps.forEach(step => step.update());
    }
}
