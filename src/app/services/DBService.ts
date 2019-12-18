import { DatabaseService } from './database.service';

export abstract class DBService {
    constructor(protected database: DatabaseService) {}
}