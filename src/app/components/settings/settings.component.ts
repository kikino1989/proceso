import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DatabaseService } from 'src/app/services/database.service';
import { LoadingController, AlertController } from '@ionic/angular';

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
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController
    ) { }

    ngOnInit() {
        this.language = this.translator.currentLang || this.translator.defaultLang;
    }

    setLanguage() {
        this.translator.use(this.language);
    }

    async doReset() {
        return this.alertCtrl.create({
            header: await this.translator.get('confirmHeader').toPromise(),
            message: await this.translator.get('irreversibleMessage').toPromise(),
            buttons:[
                {text: await this.translator.get('cancel').toPromise(), role: 'cancel'},
                {text: 'OK', handler: async () => {
                    this.loadingCtrl.create({
                        message: await this.translator.get('waitMessage').toPromise()
                    }).then(loader => {
                        loader.present();
                        this.db.openDatabase().then(async () => {
                            await this.db.clearDatabase();
                            await this.db.runSeeds();
                            await this.db.runUpdates();
                            loader.dismiss();
                        });
                    });
                }}
            ]
        }).then(alert => {
            alert.present();
        });
    }

}
