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

    getActiveProspects() {
        return this.database.openDatabase().then(db => {
            return db.executeSql(`SELECT * FROM ${this.model.tableName} WHERE id <> -1`).then(result => {
                const models = [];
                if (result.rows.length) {
                    for(let i = 0; i < result.rows.length; i++) {
                        const item = result.rows.item(i);
                        models.push(new Prospect(item));
                    }
                }
                return models;
            });
        });
    }
    
}
