import { Component, OnInit } from '@angular/core';
import { Prospect } from '../../../models/Prospect';
import { ProspectService } from '../../../services/prospect.service';
import { ProspectingSteps } from '../../../models/ProspectingSteps';
import * as _ from 'lodash';
import { AlertController, ModalController } from '@ionic/angular';
import { ProspectComponent } from '../prospect/prospect.component';

@Component({
    selector: 'prospects',
    templateUrl: './prospects.component.html',
    styleUrls: ['./prospects.component.scss'],
})
export class ProspectsComponent {

    prospects: Prospect[];
    orgProspects: Prospect[];
    prospectingSteps: ProspectingSteps[];
    constructor(
        private prospectService: ProspectService,
        private alertCtrl: AlertController,
        private modalCtrl: ModalController
    ) { }

    ionViewWillEnter() {
        this.prospectService.waitForDatabase(() => {
            this.prospectService.getProspects().then(prospects => {
                this.prospects = prospects;
                this.orgProspects = _.cloneDeep(this.prospects);
                this.prospectService.getProspectingSteps().then(steps => this.prospectingSteps = steps);
            });
        });
    }

    ngOnDestroy() {
        delete this.prospects;
        delete this.orgProspects;
        delete this.prospectingSteps;
    }

    addProspect() {
        this.modalCtrl.create({
            component: ProspectComponent,
            componentProps: {
                prospectingSteps: this.prospectingSteps
            }
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then(({data: prospect}) => {
                if (prospect) {
                    this.orgProspects.push(prospect);
                    this.prospects.push(prospect);
                    prospect.insert();
                }
            });
        });
    }

    editProspect(prospect: Prospect) {
        this.modalCtrl.create({
            component: ProspectComponent,
            componentProps: {
                orgProspect: prospect,
                prospectingSteps: this.prospectingSteps
            }
        }).then(modal => {
            modal.present();
            modal.onWillDismiss().then(({data}) => {
                if (data) {
                    for (let prop in data) {
                        if (prospect.hasOwnProperty(prop))
                            prospect[prop] = data[prop];
                    }
                    prospect.update();
                }
            });
        });
    }

    deleteProspect(prospect: Prospect) {
        const index = this.prospects.findIndex(_prospect => {
            return prospect.id === _prospect.id;
        });
        this.prospects.splice(index, 1);
        this.orgProspects.splice(index, 1);
        prospect.delete();
    }

    filterProspects(value) {
        this.prospects = this.orgProspects.filter(prospect => {
            return !value || prospect.name.toLowerCase().indexOf(value) > -1;
        });
    }

    viewStep(prospect: Prospect) {
        const step = this.prospectingSteps[prospect.step];
        this.alertCtrl.create({
            header: `(${step.name})`,
            subHeader: `Tools Needed: ${step.tools || 'N/A'}`,
            message: 
                `<b>Description:</b> ${step.description || 'N/A'} <br /><br />
                <b>Starting Point:</b> ${step.pointA || 'N/A'} <br /><br />
                <b>Goal:</b> ${step.pointB || 'N/A'}`,
            buttons: [{text: "OK", role: "ok"}]
        }).then(alert => {
            alert.present();
        });
    }

}
