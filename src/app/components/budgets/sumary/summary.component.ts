import { Component, Input } from '@angular/core';
import Budget from 'src/app/models/Budget';

@Component({
    selector: 'summary',
    templateUrl: 'summary.component.html',
    styleUrls: ['summary.component.scss']
})
export default class SummaryComponent {
    @Input() budget: Budget;
}