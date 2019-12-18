import { Component, OnInit, Input } from '@angular/core';
import { ProspectingSteps } from '../../../models/ProspectingSteps';
import { ModalController } from '@ionic/angular';
import * as _ from 'lodash';

@Component({
    selector: 'step',
    templateUrl: './step.component.html',
    styleUrls: ['./step.component.scss'],
})
export class StepComponent implements OnInit {

    @Input() lastPosition?: number;
    @Input() orgProspectingStep?: ProspectingSteps;
    public prospectingStep: ProspectingSteps;
    constructor(private modalCtrl: ModalController) { }

    ngOnInit() { 
        if (this.orgProspectingStep) {
            this.prospectingStep = _.cloneDeep(this.orgProspectingStep);
        } else {
            this.prospectingStep = new ProspectingSteps(this.lastPosition, "My Step", "My Step", "", "", "");
        }
    }

    ngOnDestroy() {
        delete this.prospectingStep;
        delete this.orgProspectingStep;
        delete this.lastPosition;
    }

    onSubmit() {
        this.modalCtrl.dismiss(this.prospectingStep);
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
