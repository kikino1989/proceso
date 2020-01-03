import { IModel } from './IModel';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

export class BaseModel implements IModel {
    public tableName: string;
    public id: number;
    public db: SQLiteObject;

    constructor(tableName) {
        this.tableName = tableName;
    }

    protected loadModel(item): BaseModel {
        const model = new BaseModel(this.tableName);
        model.db = this.db;
        for(let prop in item) {
            if (prop !== 'tableName' && prop !== 'db')  {
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
            
            this.db.executeSql(sql.replace(/\sAND$/, ''), args)
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
            let sql = `UPDATE ${this.tableName} SET `;
            const args = [];
            for(let prop in this) {
                if (this.hasOwnProperty(prop) &&
                    prop !== 'tableName' && prop !== 'db')  {
                    sql += `${prop} = ?, `;
                    args.push(this[prop]);
                }
            }
            
            sql = `${sql.replace(/,\s*$/, "")} WHERE id = ?`;
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
            const placeHolders = [];
            const fields = [];

            let sql = `INSERT INTO ${this.tableName} VALUES(`;
            const args = [];
            for(let prop in this) {
                if (this.hasOwnProperty(prop) &&
                    prop !== 'tableName' && prop !== 'id' &&
                    prop !== 'tableName' && prop !== 'db')  {
                    placeHolders.push('?');
                    fields.push(prop);
                    args.push(this[prop]);
                }
            }

            sql += `${fields.join(',').replace(/,\s*$/, "")}) VALUES(`;
            sql += `${placeHolders.join(',').replace(/,\s*$/, "")})`;
            this.db.executeSql(sql, args).then(() => {
                this.db.executeSql('SELECT last_inserted_rowid()').then((result) => {
                    this.id = result.rows.item(0).id;
                    resolve();
                }).catch((e) => reject(e));
            }).catch((e) => reject(e));
        });
    }

    async isEmpty() {
        const result = await this.db.executeSql(`SELECT COUNT(*) AS count FROM ${this.tableName}`);
        return !!(result.rows.length > 0 ? result.rows.item(0).count : 0);
    }
}