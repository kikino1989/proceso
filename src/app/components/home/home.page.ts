import { Component } from '@angular/core';
import { Budget } from '../../models/Budget';
import { BudgetsService } from '../../services/budgets.service';
import { NavController } from '@ionic/angular';
import { RemindersService } from 'src/app/services/reminders.service';
import { Subscription } from 'rxjs';
import { Reminder } from 'src/app/models/Reminer';
import { ProspectService } from 'src/app/services/prospect.service';
import { BooksService } from 'src/app/services/booksService';

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
    private remindersSubscriber: Subscription;
    private prospectSubscriber: Subscription;
    private booksSubscriber: Subscription;

    constructor(
        private budgetsService: BudgetsService,
        private prospectService: ProspectService,
        private booksService: BooksService,
        private remindersService: RemindersService,
        private navCtrl: NavController
    ) { }

    ngOnInit() {
        this.budgetsService.getActiveBudget().then(budget => {
            this.budget = budget;
        });
        this.remindersSubscriber = this.remindersService.getReminders().subscribe(reminders => {
            this.remindersCount = reminders.length;
        });
        this.prospectSubscriber = this.prospectService.getProspects().subscribe(prospects => {
            this.prospectsCount = prospects.length;
        });
        this.booksSubscriber = this.booksService.getReadingList().subscribe(books => {
            this.booksCount = books.filter(book => book.read === true).length;
        });
    }

    ngOnDestroy() {
        delete this.budget;
        delete this.remindersCount;
        delete this.prospectsCount;
        delete this.booksCount;
        this.remindersSubscriber.unsubscribe();
        this.prospectSubscriber.unsubscribe();
        this.booksSubscriber.unsubscribe();
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
