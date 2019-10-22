import { Injectable } from '@angular/core';
import { prospects } from './testdata';
import { BaseService } from '../libs/base.service';
import { Prospect } from '../models/Prospect';
import { Observable, of } from 'rxjs';
import { ProspectingSteps } from '../models/ProspectingSteps';

@Injectable({
    providedIn: 'root'
})
export class ProspectService extends BaseService <Prospect> {

    getProspects(): Observable<Prospect[]> {
        return of(prospects);
    }

    getProspectingSteps(): Observable<ProspectingSteps[]> {
        return of(ProspectingSteps.getDefaultSteps());
    }
    
}
