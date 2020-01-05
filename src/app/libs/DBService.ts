import { DatabaseService } from '../services/database.service';
import { BaseModel } from './base.model';

export abstract class DBService {
    protected model: BaseModel;
    protected submodel: BaseModel;
    
    constructor(
        protected database: DatabaseService
    ) { this.init(); }

    waitForDatabase(next: Function) {
        return this.database.openDatabase().then((db) => {
            this.model.db = db;
            return next(this.database.db);
        });
    }

    abstract init();
}