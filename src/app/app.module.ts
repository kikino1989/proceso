import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import BudgetsComponent from './components/budgets/budgets.component';
import BudgetsService from './services/budgets.service';
import { FormsModule } from '@angular/forms';
import SummaryComponent from './components/budgets/sumary/summary.component';

@NgModule({
    declarations: [
        AppComponent,
        BudgetsComponent,
        SummaryComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule
    ],
    providers: [
        BudgetsService,
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
