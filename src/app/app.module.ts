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
import { BooksService } from './services/books.service';
import { HomePage } from './components/home/home.page';
import { HeadbarComponent } from './components/headbar/headbar.component';
import { ReminderComponent } from './components/reminders/reminder/reminder.component';
import { DatabaseService } from './services/database.service';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { PhoteService } from './services/phote.service';
import { FileService } from './services/file.service';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService, TranslateLoader } from '@ngx-translate/core';
import { Globalization } from '@ionic-native/globalization/ngx';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

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
        HttpClientModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            defaultLanguage: 'en',
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        SQLite,
        DatabaseService,
        RemindersService,
        BudgetsService,
        ProspectService,
        StatusBar,
        BooksService,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        BackgroundMode,
        File,
        FileService,
        FilePath,
        FileTransfer,
        Camera,
        PhoteService,
        TranslateService,
        Globalization,
        WebView
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
