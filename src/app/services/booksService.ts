import { Injectable } from '@angular/core';
import { BaseService } from '../libs/base.service';
import { Prospect } from '../models/Prospect';
import { of, Observable } from 'rxjs';
import { Book } from '../models/Book';

@Injectable({
    providedIn: 'root'
})
export class BooksService extends BaseService <Prospect> {

    getReadingList(): Observable<Book[]> {
        return of(Book.getDefaultBooks());
    }
    
}
