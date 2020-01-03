import { Injectable } from '@angular/core';
import { Prospect } from '../models/Prospect';
import { ProspectingSteps } from '../models/ProspectingSteps';
import { DBService } from '../libs/DBService';

@Injectable({
    providedIn: 'root'
})
export class ProspectService extends DBService {

    init() {
        this.model = new Prospect();
        this.submodel = new ProspectingSteps();
    }

    getProspects(): Promise<Prospect[]> {
        return this.model.all() as Promise<Prospect[]>;
    }

    getProspectingSteps(): Promise<ProspectingSteps[]> {
        return this.submodel.all() as Promise<ProspectingSteps[]>;
    }
    
}
