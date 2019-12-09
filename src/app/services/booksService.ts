import { Injectable } from '@angular/core';
import { Book } from '../models/Book';

@Injectable({
    providedIn: 'root'
})
export class BooksService {
    private model = new Book();
    getReadingList(): Promise<Book[]> {
        return this.model.all() as Promise<Book[]>;
    }
    
}
