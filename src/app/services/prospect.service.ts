import { Injectable } from '@angular/core';
import { Prospect } from '../models/Prospect';
import { ProspectingSteps } from '../models/ProspectingSteps';

@Injectable({
    providedIn: 'root'
})
export class ProspectService {
    private model = new Prospect();
    private submodel = new ProspectingSteps();

    getProspects(): Promise<Prospect[]> {
        return this.model.all() as Promise<Prospect[]>;
    }

    getProspectingSteps(): Promise<ProspectingSteps[]> {
        return this.submodel.all() as Promise<Prospect[]>;
    }
    
}
