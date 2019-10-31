import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BudgetsService } from './services/budgets.service';
import { budgets } from './services/testdata';

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
            title: 'Reminders',
            url: '/reminders',
            icon: 'clock'
        }
    ];

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private budgetService: BudgetsService
    ) { this.initializeApp(); }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
        this.budgetService.entities = budgets;
        this.budgetService.watchBudget();
    }

    ngOnDelete() {
        delete this.appPages;
    }
}
