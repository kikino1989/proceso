import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertController } from '@ionic/angular';
import * as _ from 'lodash';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/Book';

@Component({
    selector: 'reading-list',
    templateUrl: './reading-list.component.html',
    styleUrls: ['./reading-list.component.scss'],
})
export class ReadingListComponent implements OnInit {
    
    orgBooks: Book[];
    books: Book[];
    constructor(
        private booksService: BooksService,
        private alertCtrl: AlertController
    ) { }

    ngOnInit() {
        this.booksService.getReadingList().then(books => {
            this.books = books;
            this.orgBooks = _.cloneDeep(books);
        });
    }

    ngOnDestroy() {
        delete this.orgBooks;
        delete this.books;
    }

    addBook() {
        this.alertCtrl.create({
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: "Enter Book Name."
                }
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel'
                },
                {
                    text: 'Add',
                    handler: (data) => {
                        this.books.push(new Book(this.books.length, data.name));
                    }
                }
            ]
        }).then(alert => alert.present());
    }

    deleteBook(book: Book) {
        const index = this.books.findIndex(_book => {
            return book.id === _book.id;
        });
        this.books.splice(index, 1);
        this.orgBooks.splice(index, 1);
    }

    filterBooks(value) {
        this.books = this.orgBooks.filter(book => {
            return !value || book.name.toLowerCase().indexOf(value) > -1;
        });
    }

    updateRead(book: Book) {
        if (book.progress == 100) {
            book.read = true;
        } else {
            book.read = false;
        }
    }

    updateProgress(book: Book) {
        if (book.read === true) {
            book.progress = 100;
        } else {
            book.progress = 0;
        }
    }
}
