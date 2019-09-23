import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import Chart from 'chart.js';

@Directive({
    selector: '[chartize]'
})
export class ChartizeDirective {
    static colorIndexes = "abcdefghijklmnopqrstvwxyz"
    @Input() chartize: {
        label: string,
        data: {
            labels: string[],
            values: any[] | number[]
        }
    };
    constructor(
        private el: ElementRef
    ) { }

    ngOnInit() {
        var myChart = new Chart(this.el.nativeElement, {
            type: 'bar',
            data: {
                labels: this.chartize.data.labels,
                datasets: [{
                    label: this.chartize.label,
                    data: this.chartize.data.values,
                    backgroundColor: this.chartize.data.labels.map(label => this.nameToColor(label)),
                    borderColor: this.chartize.data.labels.map(label => this.nameToBorderColor(label)),
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }

    nameToColor(name: String, add = 0) {
        const colorSet = [0, 0, 0];
        const stringLength = name.length;
        if (stringLength <= 3) {
            for (let i = 0; i < stringLength; i++) {
                colorSet[i] = ChartizeDirective.colorIndexes.indexOf(name[i]) * 10;
            }
        } else {
            const charLength = Math.floor(stringLength / 3);
            for (let i = 0; i < 3; i++) {
                colorSet[i] =  ChartizeDirective.colorIndexes.indexOf(name[i * charLength]) * 10;
            }
        }
        return `rgba(${colorSet[0] + add}, ${colorSet[1] + add}, ${colorSet[2] + add}, 0.5)`;
    }

    nameToBorderColor(name: string) {
        this.nameToColor(name, 10)
    }
}
