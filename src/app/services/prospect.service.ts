import { Injectable } from '@angular/core';
import { Prospect } from '../models/Prospect';
import { ProspectingSteps } from '../models/ProspectingSteps';
import { DBService } from './DBService';

@Injectable({
    providedIn: 'root'
})
export class ProspectService extends DBService {
    private model = new Prospect();
    private submodel = new ProspectingSteps();

    getProspects(): Promise<Prospect[]> {
        return this.database.dbReady.toPromise().then(() => {
            return this.model.all() as Promise<Prospect[]>;
        });
    }

    getProspectingSteps(): Promise<ProspectingSteps[]> {
        return this.database.dbReady.toPromise().then(() => {
            return this.submodel.all() as Promise<Prospect[]>;
        });
    }
    
}
