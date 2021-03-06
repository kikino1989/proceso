import { SQLiteObject, SQLite } from "@ionic-native/sqlite/ngx";
import { EventEmitter, Injectable } from "@angular/core";
import { Book } from "../models/Book";
import { Habit } from "../models/Habit";
import { ProspectingSteps } from "../models/ProspectingSteps";
import { BaseModel } from '../libs/base.model';

export const CURRENT_DB_VERSION = 1;

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {

    public db: SQLiteObject;
    public dbReady = new EventEmitter<SQLiteObject>();
    public dbVersion: string;
    constructor(private sqlite: SQLite) { }

    openDatabase(): Promise<SQLiteObject> {
        return this.sqlite.create({
            name: "proceso.db",
            location: "default"
        }).then(db => {
            this.db = db;
            return db;
        });
    }
    
    createTables() {
        return this.db.transaction(tx => {
            // create tables

            tx.executeSql("CREATE TABLE IF NOT EXISTS Book(id INTEGER PRIMARY KEY AUTOINCREMENT, position INTEGER NOT NULL, name TEXT NOT NULL, progress INTEGER NOT NULL, read BOOLEAN NOT NULL)");
            tx.executeSql("CREATE INDEX IF NOT EXISTS bk_name ON Book(name)");

            tx.executeSql("CREATE TABLE IF NOT EXISTS Budget(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, _limit NUMERIC NOT NULL, active BOOLEAN NOT NULL, startDate TEXT NOT NULL, snapshot TEXT DEFAULT NULL, parentID INTEGER, FOREIGN KEY(parentID) REFERENCES Budget(id) ON DELETE CASCADE)");
            tx.executeSql("CREATE INDEX IF NOT EXISTS bgt_name ON Budget(name)");

            tx.executeSql("CREATE TABLE IF NOT EXISTS Habit(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, timeGoal INTEGER, dueDate TEXT, description TEXT, frequency TEXT NOT NULL DEFAULT 'daily')");
            tx.executeSql("CREATE INDEX IF NOT EXISTS hbt_name ON Habit(name)");

            tx.executeSql("CREATE TABLE IF NOT EXISTS HabitsRecord(id INTEGER PRIMARY KEY AUTOINCREMENT, habitID INTEGER NOT NULL, date TEXT NOT NULL, FOREIGN KEY(habitID) REFERENCES Habit(id) ON DELETE CASCADE)");

            tx.executeSql("CREATE TABLE IF NOT EXISTS IncomeSource(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, budgetID INTEGER NOT NULL, value NUMERIC NOT NULL, type TEXT NOT NULL, date TEXT NOT NULL, FOREIGN KEY(budgetID) REFERENCES Budget(id) ON DELETE CASCADE)");
            tx.executeSql("CREATE INDEX IF NOT EXISTS is_name ON IncomeSource(name)");

            tx.executeSql("CREATE TABLE IF NOT EXISTS Spence(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, budgetID INTEGER NOT NULL, value NUMERIC NOT NULL, type TEXT NOT NULL, dueDate TEXT NOT NULL, _limit NUMERIC, FOREIGN KEY(budgetID) REFERENCES Budget(id) ON DELETE CASCADE)");
            tx.executeSql("CREATE INDEX IF NOT EXISTS s_name ON Spence(name)");

            tx.executeSql("CREATE TABLE IF NOT EXISTS Prospect(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT, image TEXT, step INTEGER NOT NULL DEFAULT 0)");
            tx.executeSql("CREATE INDEX IF NOT EXISTS p_name ON Prospect(name)");

            tx.executeSql("CREATE TABLE IF NOT EXISTS ProspectingSteps(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, position INTEGER NOT NULL, description TEXT, pointA TEXT, tools TEXT, pointB TEXT)");
            tx.executeSql("CREATE INDEX IF NOT EXISTS pt_name ON ProspectingSteps(name)");

            tx.executeSql("CREATE TABLE IF NOT EXISTS Reminder(id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT NOT NULL, note TEXT, frequency TEXT NOT NULL, entityID INTEGER NOT NULL, entityClass TEXT NOT NULL)");
            tx.executeSql("CREATE INDEX IF NOT EXISTS r_date ON Reminder(date)");
            // finished creating tables
        });
    }

    clearDatabase() {
        return this.db.transaction(tx => {
            tx.executeSql("DELETE FROM Book");
            tx.executeSql("DELETE FROM Budget");
            tx.executeSql("DELETE FROM Habit");
            tx.executeSql("DELETE FROM HabitsRecord");
            tx.executeSql("DELETE FROM IncomeSource");
            tx.executeSql("DELETE FROM Spence");
            tx.executeSql("DELETE FROM Prospect");
            tx.executeSql("DELETE FROM ProspectingSteps");
            tx.executeSql("DELETE FROM Reminder");
        });
    }

    async runUpdates() {
        await this.setDatabaseVersion(1);
        return new Promise(resolve => {
            this.getDatabaseVersion().then(async version => {
                for(let i = version; i <= CURRENT_DB_VERSION; i++) {
                    await this.applyUpdates(version);
                    this.setDatabaseVersion(i);
                }
                resolve();
            });
        });
    }

    applyUpdates(version: number) {
        return new Promise(resolve => {
            switch(version) {
                default: resolve();
                    break;
            }
        });
    }

    runSeeds() {
        return this.db.transaction(tx => {
            // do seeds

            this.insertDefaults(tx, "Book", Book.getDefaultBooks());
            this.insertDefaults(tx, "Habit", Habit.getDefaultHabits());
            this.insertDefaults(tx, "ProspectingSteps", ProspectingSteps.getDefaultSteps());
        });
    }

    insertDefaults(tx, tableName, defaults: BaseModel[]) {
        tx.executeSql(`SELECT COUNT(*) AS count FROM ${tableName}`, [], (tx, result) => {
            if (result.rows.item(0).count == 0) {
                defaults.forEach(async _default => {
                    let sql = `INSERT INTO ${tableName}(`;
                    const placeHolders = [];
                    const fields = [];
                    const args = [];
        
                    for(let prop in _default) {
                        if (_default.hasOwnProperty(prop) &&
                            !_default.excludedFields.includes(prop))  {
                            placeHolders.push("?");
                            fields.push(prop);
                            args.push(_default[prop]);
                        }
                    }
                    sql += `${fields.join(",").replace(/,\s*$/, '')}) VALUES(`;
                    sql += `${placeHolders.join(",").replace(/,\s*$/, '')})`;
                    tx.executeSql(sql, args);
                });
            }
        });
    }

    getDatabaseVersion() {
        return this.db.executeSql('PRAGMA user_version', []).then(result => {
            return result.rows.length ? result.rows.item(0).user_version: null;
        });
    }

    setDatabaseVersion(version: number) {
        return this.db.executeSql('PRAGMA user_version = ' + version, []).catch(e => console.error(e));
    }
}