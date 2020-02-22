import { Component } from '@angular/core';
import { Base } from './libs/Base';
import { Platform, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BudgetsService } from './services/budgets.service';
import { DatabaseService } from './services/database.service';
import { TranslateService } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent extends Base {
    public appPages = [
        {
            title: 'home.title',
            url: '/home',
            icon: 'home'
        },
        {
            title: 'budgets.title',
            url: '/budgets',
            icon: 'calculator'
        },
        {
            title: 'prospects.title',
            url: '/prospects',
            icon: 'people'
        },
        {
            title: 'steps.title',
            url: '/steps',
            icon: 'thermometer'
        },
        {
            title: 'reminders.title',
            url: '/reminders',
            icon: 'clock'
        },
        {
            title: 'habits.title',
            url: '/habits',
            icon: 'clipboard'
        },
        {
            title: 'readingList.title',
            url: '/reading',
            icon: 'book'
        },
        {
            title: 'settings.title',
            url: '/settings',
            icon: 'settings'
        }
    ];

    constructor(
        alert: AlertController,
        private platform: Platform,
        private dbService: DatabaseService,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private budgetService: BudgetsService,
        private translator: TranslateService,
        private globalization: Globalization
    ) { 
        super(alert);
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.translator.setDefaultLang('en');
            this.globalization.getPreferredLanguage().then(({value: lang}) => {
                this.translator.use(lang ? lang.split('-')[0]: 'en');
            }).catch(e  => this.doError());

            this.dbService.openDatabase().then(async db => {
                
                await this.dbService.createTables(db);
                await this.dbService.runSeeds(db);
                await this.dbService.runUpdates(db);
                
                this.dbService.dbReady.subscribe(() => {
                    this.budgetService.watchBudget();
                });
                this.dbService.dbReady.emit(db);
            })
            .catch(e => this.doError());
        });
    }

    ngOnDestroy() {
        delete this.appPages;
    }
}
