import { BaseModel } from '../libs/base.model';

export class Book extends BaseModel {
    constructor(
        public position?: number,
        public name?: string,
        public progress = 0,
        public read = false
    ) { super('Book'); }

    static getDefaultBooks(): Book[] {
        return <Book[]>[
            {
                position: 0,
                name: "Business of the 21st Century Book",
                progress: 0,
                read: false
            },
            {
                position: 1,
                name: "The Richest Man in Babylon",
                progress: 0,
                read: false
            },
            {
                position: 2,
                name: "Rish Dad Poor Dad",
                progress: 0,
                read: false
            },
            {
                position: 3,
                name: "Rich Dad's Cashflow Quadrant: Guide to Financial Freedom",
                progress: 0,
                read: false
            }
        ]
    }
}