import { IModel } from './IModel';

export class BaseModel implements IModel {
    public tableName: string;
    public id: number;
    public db = (window as any).db;

    constructor(tableName) {
        this.tableName = tableName;
    }

    protected loadModel(item): BaseModel {
        const model = new BaseModel(this.tableName);
        for(let prop in model) {
            if (model.hasOwnProperty(prop))  {
                model[prop] = item[prop];
            }
        }
        return model;
    }

    all(where: object = {}): Promise<BaseModel[]> {
        const all = [];
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${this.tableName}`;
            const args = [];
            if (Object.keys(where).length) {
                sql += ' where'
                for (let key in where) {
                    if (where.hasOwnProperty(key)) {
                        sql += ` ${key} = ? AND`;
                        args.push(where[key]);
                    }
                }
            }
            console.log('this is the sql for ', this.tableName, sql.replace(/ AND$/, ''), args)
            this.db.executeSql(sql.replace(/ AND$/, ''), args)
                .then((result) => {
                    for(var i = 0; i < result.rows.length; i++) {
                        all.push(this.loadModel(result.rows.item(i)));
                    }
                    resolve(all);
                });
        });
    }

    one(where: object = {}): Promise<BaseModel> {
        return this.all(where)[0] || null;
    }

    update(): Promise<void> {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE ${this.tableName}`;
            const args = [];
            for(let prop in this) {
                if (this.hasOwnProperty(prop)) {
                    sql += ` SET ${prop} = ?, `;
                    args.push(this[prop]);
                }
            }
            sql = `${sql.replace(/, \s*$/, "")} WHERE id = ?`;
            args.push(this.id);
            this.db.executeSql(sql, args).then(() => {
                resolve();
            }).catch((e) => reject(e));
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            let sql = `DELETE ${this.tableName} WHERE id = ?`;
            this.db.executeSql(sql, [this.id]).then(() => {
                resolve();
            }).catch((e) => reject(e));
        });
    }

    insert(): Promise<void> {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO ${this.tableName} VALUES(`;
            const args = [];
            for(let prop in this) {
                if (this.hasOwnProperty(prop)) {
                    sql += `?, `;
                    args.push(this[prop]);
                }
            }
            sql = `${sql.replace(/, \s*$/, "")})`;
            args.push(this.id);
            this.db.executeSql(sql, args).then(() => {
                this.db.executeSql('SELECT last_inserted_rowid()').then((result) => {
                    this.id = result.rows.item(0).id;
                    resolve();
                }).catch((e) => reject(e));
            }).catch((e) => reject(e));
        });
    }
}