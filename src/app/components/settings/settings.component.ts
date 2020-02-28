import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController } from '@ionic/angular';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

    public language: string;

    constructor(
        private translator: TranslateService,
        private db: DatabaseService,
        private loadingCtrl: LoadingController
    ) { }

    ngOnInit() {
        this.language = this.translator.currentLang || this.translator.defaultLang;
    }

    setLanguage() {
        this.translator.use(this.language);
    }

    doReset() {
        this.loadingCtrl.create({
            message: "Reseting app, Please wait."
        }).then(loader => {
            loader.present();
            this.db.openDatabase().then(async () => {
                await this.db.clearDatabase();
                await this.db.runSeeds();
                await this.db.runUpdates();
                loader.dismiss();
            });
        });
    }

}
