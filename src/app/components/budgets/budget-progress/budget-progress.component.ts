import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild, ApplicationRef } from '@angular/core';
import Budget from '../../../models/Budget';

@Component({
    selector: 'budget-progress',
    templateUrl: './budget-progress.component.html',
    styleUrls: ['./budget-progress.component.scss'],
})
export class BudgetProgressComponent implements OnInit {
    @Input() budget: Budget;
    @ViewChild('spendingBar', {static: false}) spendingBar: ElementRef;
    private _growthWidth = 0;
    constructor(
        public renderer: Renderer2,
        public app: ApplicationRef
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        if (this.budget.spences.length)
            this.growTo(this.spendingBarWidth);
    }

    growTo(width: number, i = 1) {
        setTimeout(() => {
            if (i <= width) {
                this.renderer.setStyle(this.spendingBar.nativeElement, 'width', `${i}%`);
                this.growthWidth = i;
                this.growTo(width, i + 1);
            }
        }, 10);
    }
    get totalSpending():number {
        if (this.budget.spences.length)
            return this.budget.spences.map(spence => spence.value).reduce((prev, cur) => prev + cur);
        return 0;
    }

    get spendingColor(): string {
        const spendingPorcentage = this.growthWidth;
        if (spendingPorcentage < 50) return 'great';
        else if (spendingPorcentage < 70) return 'good';
        else if (spendingPorcentage < 85) return 'careful';
        else if (spendingPorcentage >= 85) return 'bad';

        return 'secondary';
    }

    get spendingBarWidth(): number {
        const porcentage = (this.totalSpending / this.budget.limit) * 100;
        if (porcentage > 100)
            return 100;
        return porcentage;
    }

    get growthWidth() {
        return this._growthWidth;
    }

    set growthWidth(value) {
        this._growthWidth = value;
    }

}
