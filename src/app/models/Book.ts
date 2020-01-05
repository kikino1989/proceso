import { BaseModel } from '../libs/base.model';

export class Book extends BaseModel {
    public position: number;
    public name: string;
    public progress = 0;
    public read = false;
    constructor(properties?: Book | any) { 
        super('Book');
        this.loadModel(properties, this);
    }

    static getDefaultBooks(): Book[] {
        return [
            new Book({
                position: 0,
                name: "Business of the 21st Century Book",
                progress: 0,
                read: false
            }),
            new Book({
                position: 1,
                name: "The Richest Man in Babylon",
                progress: 0,
                read: false
            }),
            new Book({
                position: 2,
                name: "Rish Dad Poor Dad",
                progress: 0,
                read: false
            }),
            new Book({
                position: 3,
                name: "Rich Dad's Cashflow Quadrant: Guide to Financial Freedom",
                progress: 0,
                read: false
            })
        ];
    }
}