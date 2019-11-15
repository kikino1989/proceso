import { Component, OnInit } from '@angular/core';
import { Prospect } from '../../../models/Prospect';
import { ProspectService } from '../../../services/prospect.service';
import { Subscription } from 'rxjs';
import { ProspectingSteps } from '../../../models/ProspectingSteps';
import * as _ from 'lodash';
import { AlertController, ModalController } from '@ionic/angular';
import { ProspectComponent } from '../prospect/prospect.component';

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
        private alertCtrl: AlertController,
        private modalCtrl: ModalController
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
                    this.prospectService.insert(prospect);
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
                for (let prop in data) {
                    if (prospect.hasOwnProperty(prop))
                        prospect[prop] = data[prop];
                }
                this.prospectService.update(prospect);
            });
        });
    }

    deleteProspect(prospect: Prospect) {
        const index = this.prospects.findIndex(_prospect => {
            return prospect.id === _prospect.id;
        });
        this.prospects.splice(index, 1);
        this.orgProspects.splice(index, 1);
        this.prospectService.delete(prospect.id);
    }

    filterProspects(value) {
        this.prospects = this.orgProspects.filter(prospect => {
            return !value || prospect.name.indexOf(value) > -1;
        });
    }

    viewStep(prospect: Prospect) {
        const step = this.prospectingSteps[prospect.step];
        this.alertCtrl.create({
            mode: 'ios',
            header: `(${step.name})`,
            subHeader: `Tools Needed: ${step.tools || 'N/A'}`,
            message: 
                `<b>Description:</b> ${step.description || 'N/A'} <br /><br />
                <b>Starting Point:</b> ${step.pointA || 'N/A'} <br /><br />
                <b>End Point:</b> ${step.pointB || 'N/A'}`,
            buttons: [{text: "OK", role: "ok"}]
        }).then(alert => {
            alert.present();
        });
    }

}
