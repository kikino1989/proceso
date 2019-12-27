import { Component } from '@angular/core';

import { Platform, AlertController } from '@ionic/angular';
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
        private alert: AlertController,
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
            this.dbService.openDatabase().then(async db => {
                
                await this.dbService.createTables(db);
                await this.dbService.runSeeds(db);
                await this.dbService.runUpdates(db);
                this.budgetService.watchBudget();
                
                this.dbService.dbReady.emit(db);
            })
            .catch(e => {
                this.alert.create({
                    header: "ERROR",
                    message: "Oops something went wrong!",
                    buttons: [{text: "OK", role: 'ok'}],
                    cssClass: 'error-alert'
                    
                }).then(alert => alert.present());
                console.log(e);
            });
        });
    }

    ngOnDestroy() {
        delete this.appPages;
    }
}
