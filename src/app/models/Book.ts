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
            new Book(
                0,
                "Business of the 21st Century Book",
                0,
                false
            ),
            new Book(
                1,
                "The Richest Man in Babylon",
                0,
                false
            ),
            new Book(
                2,
                "Rish Dad Poor Dad",
                0,
                false
            ),
            new Book(
                3,
                "Rich Dad's Cashflow Quadrant: Guide to Financial Freedom",
                0,
                false
            )
        ]
    }
}