import { Inject } from '@angular/core';
import { AlertController } from '@ionic/angular';

export class Base {

    constructor(private alert: AlertController ) { }

    doError(error = "Oops something went wrong!") {
        this.alert.create({
            header: "ERROR!",
            message: error,
            buttons: [{text: "OK", role: 'ok'}],
            cssClass: 'error-alert'
        }).then(alert => alert.present());
        console.log(error);
    }

    doWarning(warning: string) {
        this.alert.create({
            header: "WARNING!",
            message: warning,
            buttons: [{text: "OK", role: 'ok'}],
            cssClass: 'warning-alert'
        }).then(alert => alert.present());
        console.log(warning);
    }

    doInfo(info: string) {
        this.alert.create({
            header: "HEY THERE!",
            message: info,
            buttons: [{text: "OK", role: 'ok'}],
            cssClass: 'info-alert'
        }).then(alert => alert.present());
        console.log(info);
    }

    doSuccess(success: string) {
        this.alert.create({
            header: "GREAT!",
            message: success,
            buttons: [{text: "OK", role: 'ok'}],
            cssClass: 'success-alert'
        }).then(alert => alert.present());
        console.log(success);
    }
}