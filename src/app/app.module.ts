import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BudgetsComponent } from './components/budgets/budgets.component';
import { BudgetsService } from './services/budgets.service';
import { EditComponent } from './components/budgets/edit/edit.component';
import { StatsComponent } from './components/budgets/stats/stats.component';
import { BudgetCardComponent } from './components/budgets/budget-card/budget-card.component';
import { SummaryComponent } from './components/budgets/summary/summary.component';
import { IncomeSourceComponent } from './components/budgets/income-source/income-source.component';
import { SpenceComponent } from './components/budgets/spence/spence.component';
import { ChartizeDirective } from './directives/chartize.directive';
import { BudgetProgressComponent } from './components/budgets/budget-progress/budget-progress.component';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ProjectionsComponent } from './components/budgets/projections/projections.component';
import { ProspectsComponent } from './components/prospects/prospects/prospects.component';
import { ProspectService } from './services/prospect.service';
import { ProspectComponent } from './components/prospects/prospect/prospect.component';
import { RemindersService } from './services/reminders.service';
import { RemindersComponent } from './components/reminders/reminders.component';
import { HeadbarComponent } from './home/headbar/headbar.component';
import { HomePageModule } from './home/home.module';

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
        BudgetProgressComponent,
        ChartizeDirective,
        ProjectionsComponent,
        ProspectsComponent,
        ProspectComponent,
        RemindersComponent
    ],
    entryComponents: [
        BudgetCardComponent,
        IncomeSourceComponent,
        SpenceComponent,
        ProspectComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HomePageModule
    ],
    providers: [
        RemindersService,
        BudgetsService,
        ProspectService,
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        BackgroundMode
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
