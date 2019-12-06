import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BudgetsComponent } from '../app/components/budgets/budgets.component';
import { ProspectsComponent } from './components/prospects/prospects/prospects.component';
import { RemindersComponent } from './components/reminders/reminders.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HabitsComponent } from './components/habits/habits.component';
import { StepsComponent } from './components/steps/steps.component';
import { ReadingListComponent } from './components/reading-list/reading-list.component';
import { HomePage } from './components/home/home.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePage,
    },
    {
        path: 'budgets',
        component: BudgetsComponent
    },
    {
        path: 'prospects',
        component: ProspectsComponent
    },
    {
        path: 'steps',
        component: StepsComponent
    },
    {
        path: 'reminders',
        component: RemindersComponent
    },
    {
        path: 'settings',
        component: SettingsComponent
    },
    {
        path: 'habits',
        component: HabitsComponent
    },
    {
        path: 'reading',
        component: ReadingListComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
