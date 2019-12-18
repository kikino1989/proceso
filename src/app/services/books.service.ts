import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { DBService } from './DBService';

@Injectable({
    providedIn: 'root'
})
export class BooksService extends DBService {
    
    private model = new Book();
    getReadingList(): Promise<Book[]> {
        return this.database.dbReady.toPromise().then(() => {
            return this.model.all() as Promise<Book[]>;
        });
    }
    
}
