
import { Observable, of } from 'rxjs';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { IModel } from './IModel';

abstract class Cond {
    operator: "=" | "!=" | ">" | "<" | "<=" | ">=" = "=";
    joint: "OR" | "AND" | "NOR" = "AND";
}

export type Condition = Cond | any;

export class BaseModel implements IModel {
    public tableName: string;
    public id: number;
    protected db = (window as any).db;

    constructor() {
        this.tableName = (this as any).name;
    }

    protected loadModel(item): BaseModel {
        const model = new BaseModel();
        for(let prop in model) {
            if (model.hasOwnProperty(prop))  {
                model[prop] = item[prop];
            }
        }
        return model;
    }

    all(where = '', args = []): Promise<BaseModel[]> {
        const all = [];
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${this.tableName} ${where}`;
            this.db.executeSql(sql, args)
                .then((result) => {
                    for(var i = 0; i < result.rows.length; i++) {
                        all.push(this.loadModel(result.rows.item(i)));
                    }
                    resolve(all);
                });
        });
    }

    one(where = '', args = []): Promise<BaseModel> {
        where += 'LIMIT 1';
        return this.all(where, args)[0] || null;
    }

    update(): Promise<void> {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE ${this.tableName}`;
            const args = [];
            for(let prop in this) {
                if (this.hasOwnProperty(prop)) {
                    sql += ` SET ${prop} = ?,`;
                    args.push(this[prop]);
                }
            }
            sql = `${sql.replace(/,\s*$/, "")} WHERE id = ?`;
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
                    sql += `?,`;
                    args.push(this[prop]);
                }
            }
            sql = `${sql.replace(/,\s*$/, "")})`;
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