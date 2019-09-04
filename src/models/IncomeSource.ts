import Model from "./Model";

export default class IncomeSource extends Model {

    public constructor(public name: string, public amount: number) {
        super();
    }
}