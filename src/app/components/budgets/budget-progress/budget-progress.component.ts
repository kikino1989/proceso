import { Component, OnInit, Input, Renderer2, ElementRef, ViewChild } from '@angular/core';
import Budget from 'src/app/models/Budget';

@Component({
    selector: 'budget-progress',
    templateUrl: './budget-progress.component.html',
    styleUrls: ['./budget-progress.component.scss'],
})
export class BudgetProgressComponent implements OnInit {
    @Input() budget: Budget;
    @ViewChild('spendingBar', {static: false}) spendingBar: ElementRef;
    constructor(
        public renderer: Renderer2
    ) { }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.growTo(this.spendingBarWidth);
    }

    growTo(width: number, i = 0) {
        setTimeout(() => {
            if (i < width) {
                this.renderer.setStyle(this.spendingBar.nativeElement, 'width', `${i}%`);
                this.growTo(width, i + 1)
            }
        }, 10);
    }
    get totalSpending():number {
        return this.budget.spences.map(spence => spence.value).reduce((prev, cur) => prev + cur);
    }

    get spendingColor(): string {
        const spendingPorcentage = this.spendingBarWidth;
        if (spendingPorcentage < 50) return 'great';
        else if (spendingPorcentage < 60) return 'good';
        else if (spendingPorcentage < 70) return 'careful';
        else if (spendingPorcentage >= 70) return 'bad';

        return 'secondary';
    }

    get spendingBarWidth(): number {
        const porcentage = (this.totalSpending / this.budget.limit) * 100;
        if (porcentage > 100)
            return 100;
        return porcentage;
    }

}
