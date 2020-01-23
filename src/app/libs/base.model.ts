import { IModel } from './IModel';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';
import * as _ from 'lodash';

type Dependency = {propertyName: string, tableName: string, classRef: BaseModel};
export class BaseModel implements IModel {
    public tableName: string;
    public id: number;
    public db: SQLiteObject;
    public dependencies: Dependency[] = [];
    public _loadDeps = true;
    public primaryKey = 'id';
    public dependencyForeignKey: string;
    public static excludedFields = [
        'excludedFields', 'db', 'tableName', 'dependencies', '_loadDeps', 'primaryKey', 'dependencyForeignKey'
    ];

    constructor(tableName) {
        this.tableName = tableName;
    }

    protected loadModel(item, model?:any): Promise<BaseModel> {
        if (!model) {
            model = new BaseModel(this.tableName);
            model.dependencies = _.cloneDeep(this.dependencies);
            model.dependencyForeignKey = this.dependencyForeignKey;
        }
        model.db = this.db;
        for(let prop in item) {
            if (typeof item[prop] === "object") {
                model[prop] = _.cloneDeep(item[prop]);
            } else {
                model[prop] = item[prop];
            }
        }

        if (model._loadDeps)
            return model.loadDependencies();
            
        return model;
    }

    protected loadDependencies(): Promise<BaseModel> {
        return new Promise((resolve, reject) => {
            if (!this.dependencies.length)
                return resolve(this);

            this.dependencies.forEach((dependency, index) => {
                this.db.executeSql(`SELECT * FROM ${dependency.tableName} WHERE ${this.dependencyForeignKey} = ?`, [this.id]).then(async results => {
                    const all = [];
                    for(var i = 0; i < results.rows.length; i++) {
                        const dep = await this.loadModel(results.rows.item(i), _.cloneDeep(dependency.classRef));
                        dep.db = this.db;
                        all.push(dep);
                    }
                    this[dependency.propertyName] = all;
                    if (this.dependencies.length - 1 === index) {
                        return resolve(this);
                    }
                }).catch(e => reject(e));
            });
        });
    }

    all(where: any = {}): Promise<BaseModel[]> {
        const all = [];
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${this.tableName}`;
            const args = [];
            if (Object.keys(where).length) {
                sql += ' where'
                for (let key in where) {
                    if (where.hasOwnProperty(key)) {
                        if (where[key] === null) {
                            sql += ` ${key} IS ? AND`;
                        } else {
                            sql += ` ${key} = ? AND`;
                        }
                        args.push(where[key]);
                    }
                }
            }
            
            this.db.executeSql(sql.replace(/\sAND$/, ''), args)
                .then(async result => {
                    for(var i = 0; i < result.rows.length; i++) {
                        all.push(await this.loadModel(result.rows.item(i), this));
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
                if (typeof this[prop] !== "object" &&
                    !BaseModel.excludedFields.includes(prop))  {
                    sql += `${prop} = ?, `;
                    args.push(this[prop]);
                }
            }
            
            sql = `${sql.replace(/,\s*$/, "")} WHERE id = ?`;
            args.push(this.id);
            this.db.executeSql(sql, args).then(() => {
                this.updateDependencies().then(() => {
                    return resolve();
                }).catch((e) => reject(e));
            }).catch((e) => reject(e));
        });
    }

    delete() {
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
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
                    !BaseModel.excludedFields.includes(prop))  {
                    if (prop === 'id' && (this['id'] === undefined || this['id'] === null)) {
                        continue;
                    }
                    placeHolders.push('?');
                    fields.push(prop);
                    args.push(this[prop]);
                }
            }

            sql += `${fields.join(',').replace(/,\s*$/, "")}) VALUES(`;
            sql += `${placeHolders.join(',').replace(/,\s*$/, "")})`;
            this.db.executeSql(sql, args).then((result) => {
                this.id = result.insertId;
                this.updateDependencies().then(() => {
                    return resolve();
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
        return new Promise((resolve, reject) => {
            if (!this.dependencies.length || !this.dependencyForeignKey)
                return resolve();

            this.dependencies.forEach((dependency, index) => {
                const dependencyInstances: BaseModel[] = this[dependency.propertyName];
                if (dependencyInstances && dependencyInstances.length) {
                    this.db.executeSql(`DELETE FROM ${dependency.tableName}`, []).then(() => {
                        dependencyInstances.forEach(inst => {
                            inst.db = this.db;
                            inst[this.dependencyForeignKey] = this[this.primaryKey];
                            inst.insert().then(() => {
                                if (this.dependencies.length - 1 === index) {
                                    return resolve();
                                }
                            }).catch(e => reject(e));
                        });
                    });
                }
            });
        });
    }
}