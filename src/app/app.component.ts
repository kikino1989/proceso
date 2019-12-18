import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BudgetsService } from './services/budgets.service';
import { DatabaseService } from './services/database.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'Budgets',
            url: '/budgets',
            icon: 'calculator'
        },
        {
            title: 'Prospects',
            url: '/prospects',
            icon: 'people'
        },
        {
            title: 'Recruiting Steps',
            url: '/steps',
            icon: 'thermometer'
        },
        {
            title: 'Reminders',
            url: '/reminders',
            icon: 'clock'
        },
        {
            title: 'Habits Tracker',
            url: '/habits',
            icon: 'clipboard'
        },
        {
            title: 'Reading List',
            url: '/reading',
            icon: 'book'
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: 'settings'
        }
    ];

    constructor(
        private platform: Platform,
        private dbService: DatabaseService,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private budgetService: BudgetsService
    ) { this.initializeApp(); }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.dbService.openDatabase().then(() => {
                this.budgetService.watchBudget();
            })
            // .catch(e => console.log('ERROR::', e));
        });
    }

    ngOnDelete() {
        delete this.appPages;
    }
}
