import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

    public language: string;

    constructor(
        private translator: TranslateService        
    ) { }

    ngOnInit() {
        this.language = this.translator.currentLang || this.translator.defaultLang;
    }

    setLanguage() {
        this.translator.use(this.language);
    }

}
