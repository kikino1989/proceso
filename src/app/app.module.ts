import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { FormsModule } from '@angular/forms';
import BudgetsComponent from './components/budgets/budgets.component';
import BudgetsService from './services/budgets.service';
import EditComponent from './components/budgets/edit/edit.component';
import StatsComponent from './components/budgets/stats/stats.component';
import BudgetCardComponent from './components/budgets/budget-card/budget-card.component';
import SummaryComponent from './components/budgets/summary/summary.component';
import { IncomeSourceComponent } from './components/budgets/income-source/income-source.component';
import { SpenceComponent } from './components/budgets/spence/spence.component';

@NgModule({
    declarations: [
        AppComponent,
        BudgetsComponent,
        SummaryComponent,
        EditComponent,
        StatsComponent,
        BudgetCardComponent,
        IncomeSourceComponent,
        SpenceComponent,
    ],
    entryComponents: [
        IncomeSourceComponent,
        SpenceComponent
    ],
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
