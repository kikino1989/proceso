import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BudgetsComponent } from '../app/components/budgets/budgets.component';
import { ProspectsComponent } from './components/prospects/prospects/prospects.component';
import { RemindersComponent } from './components/reminders/reminders.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
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
        path: 'reminders',
        component: RemindersComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
