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
export class ReadingListComponent {
    
    orgBooks: Book[];
    books: Book[];
    constructor(
        private booksService: BooksService,
        private alertCtrl: AlertController
    ) { }

    ionViewWillEnter() {
        this.booksService.waitForDatabase(() => {
            this.booksService.getReadingList().then(books => {
                this.books = books;
                this.orgBooks = _.cloneDeep(books);
            });
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
                        const book = new Book({position: this.books.length, name: data.name})
                        this.books.push(book);
                        book.insert();
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
        book.delete();
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
        book.update();
    }

    updateProgress(book: Book) {
        if (book.read === true) {
            book.progress = 100;
        } else {
            book.progress = 0;
        }
        book.update();
    }
}
