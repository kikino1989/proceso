import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Prospect } from '../../../models/Prospect';
import { ProspectingSteps } from '../../../models/ProspectingSteps';
import * as _  from 'lodash';

@Component({
    selector: 'prospect',
    templateUrl: './prospect.component.html',
    styleUrls: ['./prospect.component.scss'],
})
export class ProspectComponent implements OnInit {

    @Input() orgProspect?: Prospect;
    @Input() prospectingSteps: ProspectingSteps;
    public prospect: Prospect;
    public reminder? = {};
    constructor(private modalCtrl: ModalController) { }

    ngOnInit() {
        console.info('this is prospect::', this.orgProspect);
        if (this.orgProspect)
            this.prospect = _.cloneDeep(this.orgProspect);
        else
            this.prospect = new Prospect("", "");
    }

    ngOnDelete() {
        delete this.orgProspect;
        delete this.prospectingSteps;
        delete this.prospect;
        delete this.reminder;
    }

    onSubmit() {
        this.modalCtrl.dismiss(this.prospect);
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
