import { IModel } from './IModel';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import * as _ from 'lodash';

type Dependency = {propertyName: string, tableName: string, classRef: BaseModel};
export class BaseModel implements IModel {
    public tableName: string;
    public id: number;
    public db: SQLiteObject;
    public dependencies: Dependency[] = [];

    constructor(tableName) {
        this.tableName = tableName;
    }

    protected loadModel(item, model:any = new BaseModel(this.tableName)): Promise<BaseModel> {
        model.db = this.db;
        for(let prop in item) {
            if (typeof item[prop] === "object") {
                model[prop] = _.cloneDeep(item[prop]);
            } else {
                model[prop] = item[prop];
            }
        }
        return model.loadDependencies();
    }

    protected loadDependencies(): Promise<BaseModel> {
        if (!this.dependencies.length)
            return Promise.resolve(this);

        return new Promise((resolve, reject) => {
            this.dependencies.forEach((dependency, index) => {
                this.db.executeSql(`SELECT * FROM ${dependency.tableName} WHERE id = ?`, [this.id]).then(async results => {
                    const all = [];
                    for(var i = 0; i < results.rows.length; i++) {
                        all.push(await this.loadModel(results.rows.item(i), dependency.classRef));
                    }
                    this[dependency.propertyName] = all;
                    if (this.dependencies.length - 1 === index) {
                        resolve(this);
                    }
                }).catch(e => reject(e));
            });
        });
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
                .then(async result => {
                    for(var i = 0; i < result.rows.length; i++) {
                        all.push(await this.loadModel(result.rows.item(i)));
                    }
                    resolve(all);
                }).catch(e => reject(e));
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
                if (typeof this[prop] === "object" &&
                    prop !== 'tableName' && prop !== 'db')  {
                    sql += `${prop} = ?, `;
                    args.push(this[prop]);
                }
            }
            
            sql = `${sql.replace(/,\s*$/, "")} WHERE id = ?`;
            this.db.executeSql(sql, args).then(() => {
                this.updateDependencies().then(() => {
                    resolve();
                }).catch((e) => reject(e));
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

            let sql = `INSERT INTO ${this.tableName}(`;
            const args = [];
            for(let prop in this) {
                if (typeof this[prop] !== "object" &&
                    prop !== 'tableName' && prop !== 'id' && prop !== 'db')  {
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
                    this.updateDependencies().then(() => {
                        resolve();
                    }).catch((e) => reject(e));
                }).catch((e) => reject(e));
            }).catch((e) => reject(e));
        });
    }

    async isEmpty() {
        const result = await this.db.executeSql(`SELECT COUNT(*) AS count FROM ${this.tableName}`, []);
        return !!result.rows.length;
    }

    async exists() {
        const result = await this.db.executeSql(`SELECT COUNT(*) AS count FROM ${this.tableName} WHERE id = ?`, [this.id]);
        return !!result.rows.length;
    }

    updateDependencies() {
        if (!this.dependencies.length)
            return Promise.resolve();

        return new Promise((resolve, reject) => {
            this.dependencies.forEach((dependency, index) => {
                const dependencyInstances: BaseModel[] = this[dependency.propertyName];
                if (dependencyInstances && dependencyInstances.length) {
                    this.db.executeSql(`DELETE FROM ${dependency.tableName}`, []).then(() => {
                        dependencyInstances.forEach(inst => {
                            inst.insert().then(() => {
                                if (this.dependencies.length - 1 === index) {
                                    resolve();
                                }
                            }).catch(e => reject(e));
                        });
                    });
                }
            });
        });
    }
}