const iDtracker = {id: 0};
export class HabitsRecord {
    public id = iDtracker.id;
    constructor(
        public habitID: number,
        public date: string
    ) { iDtracker.id++ }
}