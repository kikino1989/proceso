import { Component } from '@angular/core';
import { Budget } from '../../models/Budget';
import { BudgetsService } from '../../services/budgets.service';
import { NavController } from '@ionic/angular';
import { RemindersService } from 'src/app/services/reminders.service';
import { ProspectService } from 'src/app/services/prospect.service';
import { BooksService } from 'src/app/services/books.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
    selector: 'home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    public budget: Budget;
    public remindersCount = 0;
    public prospectsCount = 0;
    public booksCount = 0;

    constructor(
        private databaseService: DatabaseService,
        private budgetsService: BudgetsService,
        private prospectService: ProspectService,
        private booksService: BooksService,
        private remindersService: RemindersService,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
    }

    ionViewWillEnter() {
        if (this.databaseService.db) {
            this.loadData();
        } else {
            this.databaseService.dbReady.subscribe(() => {
                this.loadData();
            });
        }
    }

    ngOnDestroy() {
        delete this.budget;
        delete this.remindersCount;
        delete this.prospectsCount;
        delete this.booksCount;
    }

    loadData() {
        this.budgetsService.waitForDatabase(() => {
            this.budgetsService.getActiveBudget().then(budget => {
                this.budget = budget;
            });
        });
        this.remindersService.waitForDatabase(() => {
            this.remindersService.getReminders().then(reminders => {
                this.remindersCount = reminders.length;
            });
        });
        this.prospectService.waitForDatabase(() => {
            this.prospectService.getProspects().then(prospects => {
                this.prospectsCount = prospects.length;
            });
        });
        this.booksService.waitForDatabase(() => {
            this.booksService.getReadingList().then(books => {
                this.booksCount = books.filter(book => book.read === true).length;
            });
        });
    }

    gotoBudgets() {
        this.navCtrl.navigateForward('budgets');
    }

    gotoReminders() {
        this.navCtrl.navigateForward('reminders');
    }

    gotoProspects() {
        this.navCtrl.navigateForward('prospects');
    }

    gotoBooks() {
        this.navCtrl.navigateForward('reading');
    }
}
