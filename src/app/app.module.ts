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
import { SettingsComponent } from './components/settings/settings.component';
import { HabitsComponent } from './components/habits/habits.component';
import { HabitComponent } from './components/habits/habit/habit.component';
import { HabitsRecordComponent } from './components/habits/habits-record/habits-record.component';
import { StepsComponent } from './components/steps/steps.component';
import { StepComponent } from './components/steps/step/step.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
import { BooksService } from './services/booksService';
import { HomePage } from './components/home/home.page';
import { HeadbarComponent } from './components/headbar/headbar.component';
import { ReminderComponent } from './components/reminders/reminder/reminder.component';

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
        RemindersComponent,
        SettingsComponent,
        HabitsComponent,
        HabitComponent,
        HabitsRecordComponent,
        StepsComponent,
        StepComponent,
        ReadingListComponent,
        HomePage,
        HeadbarComponent,
        ReminderComponent
    ],
    entryComponents: [
        BudgetCardComponent,
        IncomeSourceComponent,
        SpenceComponent,
        ProspectComponent,
        HabitComponent,
        HabitsRecordComponent,
        StepComponent
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        RemindersService,
        BudgetsService,
        ProspectService,
        StatusBar,
        BooksService,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        BackgroundMode
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
