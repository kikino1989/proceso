import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/Prospect';
import { ProspectService } from 'src/app/services/prospect.service';
import { Subscription } from 'rxjs';
import { ProspectingSteps } from 'src/app/models/ProspectingSteps';

@Component({
    selector: 'app-prospects',
    templateUrl: './prospects.component.html',
    styleUrls: ['./prospects.component.scss'],
})
export class ProspectsComponent implements OnInit {

    prospects: Prospect[];
    prospectingSteps: ProspectingSteps[];
    prospectSubscription: Subscription;
    stepsSubscription: Subscription;
    constructor(private prospectService: ProspectService) { }

    ngOnInit() {
        this.prospectSubscription = this.prospectService.getProspects().subscribe(prospects => this.prospects = prospects);
        this.stepsSubscription = this.prospectService.getProspectingSteps().subscribe(steps => this.prospectingSteps = steps);
    }

    ngOnDelete() {
        this.prospectSubscription.unsubscribe();
        this.stepsSubscription.unsubscribe()
        delete this.prospects;
        delete this.prospectingSteps;
    }

}
