import { DatabaseService } from '../services/database.service';
import { BaseModel } from './base.model';

export abstract class DBService {
    protected model: BaseModel;
    protected submodel: BaseModel;
    
    constructor(
        protected database?: DatabaseService
    ) { this.init(); }

    waitForDatabase(next: Function) {
        return this.database.openDatabase().then((db) => {
            if (this.model) this.model.db = db;
            if (this.submodel) this.submodel.db = db;
            return next(this.database.db);
        });
    }

    abstract init();
}