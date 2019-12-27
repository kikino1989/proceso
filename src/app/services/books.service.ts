import { Injectable } from '@angular/core';
import { Book } from '../models/Book';
import { DBService } from '../libs/DBService';

@Injectable({
    providedIn: 'root'
})
export class BooksService extends DBService {
    
    init() {
        this.model = new Book();
    }
    
    getReadingList(): Promise<Book[]> {
        return this.model.all() as Promise<Book[]>;
    }
    
}
