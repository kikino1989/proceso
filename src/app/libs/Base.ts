import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

export class Base {

    constructor(
        private alert: AlertController,
        private translate: TranslateService
    ) { }

    async doError(error: string) {
        this.alert.create({
            header: await this.translate.get('errorHeader').toPromise(),
            message: error || await this.translate.get('errorMessage').toPromise(),
            buttons: [{text: "OK", role: 'ok'}],
            cssClass: 'error-alert'
        }).then(alert => alert.present());
        console.log(error);
    }

    async doWarning(warning: string) {
        this.alert.create({
            header: await this.translate.get('warningHeader').toPromise(),
            message: warning,
            buttons: [{text: "OK", role: 'ok'}],
            cssClass: 'warning-alert'
        }).then(alert => alert.present());
        console.log(warning);
    }

    async doInfo(info: string) {
        this.alert.create({
            header: await this.translate.get('infoHeader').toPromise(),
            message: info,
            buttons: [{text: "OK", role: 'ok'}],
            cssClass: 'info-alert'
        }).then(alert => alert.present());
        console.log(info);
    }

    async doSuccess(success: string) {
        this.alert.create({
            header: await this.translate.get('successHeader').toPromise(),
            message: success,
            buttons: [{text: "OK", role: 'ok'}],
            cssClass: 'success-alert'
        }).then(alert => alert.present());
        console.log(success);
    }
}